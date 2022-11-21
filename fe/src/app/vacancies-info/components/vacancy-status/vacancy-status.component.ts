import {Component} from '@angular/core';
import {ModalsService} from 'src/app/modals/modals.service';
import {ShapeDataService} from '../../services/shape-data.service';

@Component({
  selector: 'app-vacancy-status',
  templateUrl: './vacancy-status.component.html',
  styleUrls: ['./vacancy-status.component.scss']
})
export class VacancyStatusComponent {
  constructor(public sharedService: ShapeDataService, public dialogService: ModalsService) {}
}
