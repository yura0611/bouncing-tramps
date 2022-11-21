import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'src/app/shared/services/cookie.service';
import {IUser} from 'src/app/user/models/user.interface';
import {UserService} from 'src/app/user/services/user.service';
import {StoreService} from '../../../shared/services/store.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  interpolation: ['{{', '}}']
})
export class ToolbarComponent implements OnInit {
  condition: boolean = false;
  userAvatar: IUser['picture'] = '';

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setUserAvatar();
  }

  toggle() {
    this.condition = !this.condition;
  }

  @HostListener('document:click', ['$event']) onDocumentClick() {
    this.condition = false;
  }

  logOut() {
    this.cookieService.remove('jwt_token');
    this.storeService.set('user', null);
    this.router.navigateByUrl('/signin').then();
  }

  setUserAvatar() {
    this.userService.getUser().subscribe(res => {
      this.userAvatar = res.picture;
    });
  }
}
