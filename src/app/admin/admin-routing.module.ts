import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PendingOrdersComponent } from './components/pending-orders/pending-orders.component';
import { RejectedOrdersComponent } from './components/rejected-orders/rejected-orders.component';
import { DeliveredOrdersComponent } from './components/delivered-orders/delivered-orders.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'pending-orders', pathMatch: 'full' },
      { path: 'pending-orders', component: PendingOrdersComponent },
      { path: 'delivered-orders', component: DeliveredOrdersComponent },
      { path: 'rejected-orders', component: RejectedOrdersComponent },
    ] 
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }