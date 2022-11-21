import {Component, OnInit} from '@angular/core';
import {ApplicationService} from 'src/app/application/services/application.service';
import {CookieService} from 'src/app/shared/services/cookie.service';

@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss']
})
export class VacanciesListComponent implements OnInit {
  public logined: Boolean = false;
  public appNeedReview: number = 0;

  constructor(
    private cookieService: CookieService,
    private applicationService: ApplicationService
  ) {}

  removeSuccessMessage() {
    setTimeout(() => {
      this.logined = false;
    }, 3000);
  }

  ngOnInit(): void {
    if (this.cookieService.get('logined')) {
      this.logined = true;

      this.cookieService.remove('logined');
    }
    this.removeSuccessMessage();

    this.applicationService.getCompleted().subscribe(item => {
      this.appNeedReview = item.length;
    });
  }
}
