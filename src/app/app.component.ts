import {Component, ViewEncapsulation} from '@angular/core';
import {AngularTableComponent} from './components/angular-table/angular-table.component';
import {AngularTabsComponent} from './components/angular-tabs/angular-tabs.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    AngularTableComponent,
    AngularTabsComponent
  ],
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'angular table';
}
