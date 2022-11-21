import {Component} from '@angular/core';
import {ShapeDataService} from '../../services/shape-data.service';
import {ModalsService} from '../../../modals/modals.service';

@Component({
  selector: 'app-remove-applications-modal',
  templateUrl: './remove-applications-modal.component.html',
  styleUrls: ['./remove-applications-modal.component.scss']
})
export class RemoveApplicationsModalComponent {
  constructor(public sharedService: ShapeDataService, public dialogService: ModalsService) {}
}
