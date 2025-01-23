import { Component } from '@angular/core';
import {AngularTableComponent} from './components/angular-table/angular-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    AngularTableComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular table';
}
