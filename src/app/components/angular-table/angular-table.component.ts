import {Component, OnInit} from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {MultiSelect} from 'primeng/multiselect';
import {TableType} from '../../types/tableType.interface';
import {AngularTableService} from './angular-table.service';
import {DropdownModule} from 'primeng/dropdown';
import {Tag} from 'primeng/tag';
import {Column} from '../../types/column.interface';
import {CurrencyPipe} from '@angular/common';

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
    Tag,
    CurrencyPipe
  ],
})
export class AngularTableComponent implements OnInit {
  searchValue = '';

  values: TableType[] = [];
  loading = false;

  cols: Column[] = [];

  selectedColumns: Column[] = [];

  constructor(private service: AngularTableService) {
    this.loading = true;
    this.getColumns();
  }

  getColumns(){
    this.cols = [
      { field: 'name.first', header: 'First Name', sortable: true, type: 'text' },
      { field: 'name.last', header: 'Last Name', sortable: true, type: 'text' },
      { field: 'age', header: 'Age', sortable: true, type: 'numeric' },
      { field: 'company', header: 'Company', sortable: true, type: 'text' },
      { field: 'isActive', header: 'isActive', sortable: false, type: 'boolean' },
      { field: 'balance', header: 'balance', sortable: true, type: 'text' },
      { field: 'email', header: 'Email', sortable: true, type: 'text' },
      { field: 'address', header: 'Address', sortable: true, type: 'text' },
      { field: 'tags', header: 'Tags', sortable: false, type: 'any' },
    ];

    this.selectedColumns = this.cols;
  }

  ngOnInit(): void {
    this.service.getValuesTable().then((items) => {
      this.values = items;
      this.loading = false;
    });
  }

  clear(dt: Table) {
    dt.clear();
  }

}
