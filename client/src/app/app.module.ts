/**
    @description : main module which aslo handle dashboard module 
    @since : 30-07-2017
    @author : uds214125@gmail.com
 */
import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes }   from '@angular/router';

//custom providers 
import { Data } from "./shared/providers/data";

//default component routing 
import { AppComponent } from './app.component';
 
//child component routing 
import {DashboardRoutingModule } from './dashboard.module';

// component routing 
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';


//routes configuration 
const appRoutes: Routes = [
  { path: 'signin', component: SigninComponent,data:{title:'Sign In'}},
  { path: 'signup', component: SignupComponent }, 
  { path: '',redirectTo: '/signin',pathMatch: 'full'},
  { path: '**', component: PagenotfoundComponent }
];


  
// registering all public component here 
@NgModule({
  declarations: [    
    AppComponent,  
    PagenotfoundComponent,
    SignupComponent,
    SigninComponent
  ], 
  imports: [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    //  RouterModule.forRoot(appRoutes,{ useHash: true }), // # hashbang
    DashboardRoutingModule
  ],
   providers: [Data],
      // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
 