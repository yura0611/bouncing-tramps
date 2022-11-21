import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {IApplication} from 'src/app/application/models/application.interface';
import {ApplicationService} from 'src/app/application/services/application.service';
import {TableNeedReviewListDataSource} from './application-review-table-datasource';

@Component({
  selector: 'app-application-review-table',
  templateUrl: './application-review-table.component.html',
  styleUrls: ['./application-review-table.component.scss']
})
export class ApplicationReviewTableComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IApplication>;
  dataSource: TableNeedReviewListDataSource;
  displayedColumns = ['vacancy', 'type', 'candidate', 'opened'];

  constructor(private applicationService: ApplicationService) {
    this.dataSource = new TableNeedReviewListDataSource();
  }

  ngAfterViewInit(): void {
    this.applicationService.getCompleted().subscribe(list => {
      this.dataSource.data = list;
      this.dataSource.sort = this.sort;
      this.table.dataSource = this.dataSource;
    });
  }
}
