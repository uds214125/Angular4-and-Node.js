import { Component } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import {Router,ActivatedRouteSnapshot,NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap'; 
import {Observable} from 'rxjs/Rx';
// import {HomeComponent} from './home/index';
// import {ROUTER_DIRECTIVES} from "@angular/router";


@Component({
  //moduleId:moudle.id,	
  selector: 'app-root',
  templateUrl: './app.component.html', //template:'<h1>{{name}}</h1>'
  styleUrls: ['./app.component.css'],
  // directives:['HomeComponent'],
})


export class AppComponent {
  // title = 'uda works! woop woops.';
  // name="haribol";
   isLogin=false;
  constructor(private router: Router) {
   
    if(sessionStorage.getItem('token')){
        this.isLogin=true;
      }

    this.title = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.getDeepestTitle(this.router.routerState.snapshot.root));
  }

  title: Observable<string>;

  private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot) {
    var title = routeSnapshot.data ? routeSnapshot.data['title'] : '';
    if (routeSnapshot.firstChild) {
      title = this.getDeepestTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }
 

} 
     