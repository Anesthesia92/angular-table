import {Component, ViewEncapsulation} from '@angular/core';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-angular-tabs',
  imports: [
    TabPanel,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
  ],
  templateUrl: './angular-tabs.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})

export class AngularTabsComponent {
  tabs: { title: string; value: number; content: string }[] = [];
  value: number = 0;

  constructor() {
    this.tabs = [
      {
        title: 'Sorting',
        content: 'Sorting allows you to arrange data in a specific order based on selected criteria.',
        value: 0
      },
      {
        title: 'Filtering',
        content: 'Filtering helps you narrow down the data to display only the entries that meet certain conditions.',
        value: 1
      },
      {
        title: 'Search',
        content: 'Search functionality lets users find specific items or data quickly using keywords.',
        value: 2
      },
      {
        title: 'Pagination',
        content: 'Pagination divides large datasets into smaller chunks to improve performance and user experience.',
        value: 3
      },
      {
        title: 'Responsive Design',
        content: 'Responsive design ensures that your application looks good on all devices by adapting to different screen sizes.',
        value: 4
      },
    ];
  }
}
