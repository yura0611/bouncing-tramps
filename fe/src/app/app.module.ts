import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ModalsComponent} from './modals/modals.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderInterceptor} from './shared/interceptors/header.interceptor';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, ModalsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    SharedModule
  ],
  providers: [HeaderInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule {}
