import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PendingOrdersComponent } from './components/pending-orders/pending-orders.component';
import { DeliveredOrdersComponent } from './components/delivered-orders/delivered-orders.component';
import { RejectedOrdersComponent } from './components/rejected-orders/rejected-orders.component';


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    PendingOrdersComponent,
    DeliveredOrdersComponent,
    RejectedOrdersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
