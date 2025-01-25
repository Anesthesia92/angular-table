import {AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {MultiSelect} from 'primeng/multiselect';
import {TableType} from '../../types/tableType.interface';
import {AngularTableService} from './angular-table.service';
import {DropdownModule} from 'primeng/dropdown';

import {Column} from '../../types/column.interface';
import {CurrencyPipe, NgStyle} from '@angular/common';
import {Subscription} from 'rxjs';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-angular-table',
  templateUrl: './angular-table.component.html',
  standalone: true,
  imports: [
    TableModule,
    Button,
    InputText,
    FormsModule,
    MultiSelect,
    DropdownModule,
    Card,
    CurrencyPipe,
    NgStyle,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AngularTableComponent implements OnInit, AfterViewInit, OnDestroy {
  searchValue = '';

  values: TableType[] = [];
  loading = false;

  cols: Column[] = [];

  selectedColumns: Column[] = [];
  approveTypes: string[] = [];

  selected: any[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private service: AngularTableService) {
    this.loading = true;
    this.getColumns();
  }

  getColumns() {
    this.cols = [
      {field: 'name.first', header: 'First Name', sortable: true, type: 'text'},
      {field: 'name.last', header: 'Last Name', sortable: true, type: 'text'},
      {field: 'age', header: 'Age', sortable: true, type: 'numeric'},
      {field: 'company', header: 'Company', sortable: true, type: 'text'},
      {field: 'favoriteFruit', header: 'Favorite fruit', sortable: true, type: 'text'},
      {field: 'isActive', header: 'isActive', sortable: false, type: 'boolean'},
      {field: 'balance', header: 'balance', sortable: true, type: 'numeric'},
      {field: 'email', header: 'Email', sortable: true, type: 'text'},
      {field: 'address', header: 'Address', sortable: true, type: 'text'},
      {field: 'tags', header: 'Tags', sortable: false, type: 'any'},
    ];

    this.selectedColumns = this.cols;
  }

  ngOnInit(): void {
    this.getValuesTable();
    this.generateCircles();
  }

  getValuesTable() {
    this.subscription.add(this.service.getValuesTable().subscribe((items) => {
      this.values = items;
      this.values.map(item => item.balance = this.changeBalanceTypeToNumeric(item.balance));
      this.loading = false;
    }));
  }

  ngAfterViewInit() {
    this.getTags();
  }

  getTags() {
    const tags = this.values.map(item => item.tags).flat();

    this.approveTypes = Array.from(new Set(tags));
  }

  clear(dt: Table) {
    dt.clear();
    this.getValuesTable();
    this.generateCircles();
  }

  changeBalanceTypeToNumeric(value: any): number {
    if (value || typeof value === 'string') {
      const regExp = /[,$]/g;
      const balance = value.replace(regExp, '');

      return Number(balance);
    }
    return 0;
  }

  generateCircles(): void {
    this.values.map(item => {
      item.color = this.getRandomColor();
    })
  }

  getRandomColor(): string {
    //изображения (picture) не отображаются, поэтому решила заменить их на цветные круги.

    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  darkenColor(color: string): string {
    let r: number = parseInt(color.slice(1, 3), 16);
    let g: number = parseInt(color.slice(3, 5), 16);
    let b: number = parseInt(color.slice(5, 7), 16);

    r = Math.floor(r * 0.9);
    g = Math.floor(g * 0.9);
    b = Math.floor(b * 0.9);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  filterObjectsByTags(strings: string[], objects: TableType[]) {
    let ex = objects.filter(obj =>
      obj.tags.some(tag => strings.includes(tag))
    );
    this.values = [...ex];
  }

  getFruitColor(fruit: string): string {
    switch (fruit.toLowerCase()) {
      case 'apple':
        return '#ff0000';
      case 'banana':
        return '#ffe135';
      case 'strawberry':
        return '#ff4b4b';
      default:
        return '#000000';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
