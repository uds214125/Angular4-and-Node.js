/**
    @description : header component
    @since : 30-07-2017
    @author : uds214125@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Data} from '../shared/providers/data';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private username;
  constructor(private route: ActivatedRoute, private router: Router,private data:Data) { 
    // this.username = this.route.snapshot.params["username"];
    // console.log(" from header : ",data.storage.username); 
    this.username=data.storage.username;  
  }

  ngOnInit() {
     
    this.route
      .queryParams
      .subscribe(params => {
          // this.username = params['username'];
      });
  
  }  
}
