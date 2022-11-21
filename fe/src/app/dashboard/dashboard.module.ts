import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './components/container/dashboard.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, ToolbarComponent],
  imports: [CommonModule, DashboardRoutingModule, MatToolbarModule, MatIconModule, FormsModule]
})
export class DashboardModule {}
