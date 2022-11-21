import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthContainerComponent} from './components/container/container.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {PopUpComponent} from './components/pop-up/pop-up.component';

@NgModule({
  declarations: [AuthContainerComponent, LoginPageComponent, PopUpComponent],
  imports: [CommonModule, AuthRoutingModule, MatButtonModule]
})
export class AuthModule {}
