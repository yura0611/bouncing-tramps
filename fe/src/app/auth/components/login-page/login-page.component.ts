import {ILoginResponse} from '../../models/login-responce.interfase';
import {IUser} from '../../../user/models/user.interface';
import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from '../../../shared/services/cookie.service';
import {GoogleSigninService} from '../../services/google-signin.service';
import {StoreService} from 'src/app/shared/services/store.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public success!: boolean;
  user!: IUser | null | undefined;
  private JWT!: string;
  id_token!: string;

  constructor(
    private signInService: GoogleSigninService,
    private ref: ChangeDetectorRef,
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router,
    private zone: NgZone,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.signInService.Observable().subscribe(googleUser => {
      this.ref.detectChanges();
      if (googleUser) {
        this.authService.logIn(googleUser.getAuthResponse().id_token).subscribe(
          async (res: ILoginResponse) => {
            this.JWT = res.token;
            if (res.token !== '') {
              this.success = true;
            }
            this.user = {...res.user};
            this.cookieService.set('jwt_token', this.JWT);
            this.cookieService.set('logined', 'true');
            this.redirect();
            this.storeService.set('user', this.user);
          },
          (error: any) => {
            this.user = null;
            this.success = false;
            console.log(error);
          }
        );
      }
    });
  }

  signIn() {
    this.signInService.signIn();
  }

  redirect() {
    this.zone.run(() => {
      this.router.navigateByUrl('/vacancies').then();
    });
    this.signOut();
  }

  signOut() {
    this.signInService.signOut();
  }
}
