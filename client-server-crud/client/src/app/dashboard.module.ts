/**
    @description : child module which keeps header and footer sticky for all component 
    @since : 30-07-2017
    @author : uds214125@gmail.com
 */
import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';// <-- #1 import module
import { HttpModule } from '@angular/http';
import { RouterModule,Routes }   from '@angular/router';

 

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { HeaderDirective } from './header.directive';
 

import { TaskComponent } from './task/task.component';

export const dashboardRoutes: Routes = [
    {
        path: 'dashboard', 
        component: DashboardComponent,
        children:[
            // { path: '', component: DashboardComponent },
            // { path:'dashboard',component:DashboardComponent,data:{title:'Dash'}},
            { path:'task',component:TaskComponent},          
      
        ]
    }
  
] 
@NgModule({
    declarations:[

    // PagenotfoundComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    HeaderDirective,
 
    TaskComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule, // <-- #2 add to @NgModule imports
        HttpModule,
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [ RouterModule ]
})
export class DashboardRoutingModule { }