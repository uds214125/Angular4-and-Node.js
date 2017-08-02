/**
    @description : dashboard component contains header, footer , task , signout 
    @since : 30-07-2017
    @author : uds214125@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from "../shared/providers/data";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public username: any;
  public isLogin: string;
  public lastname: string;
  userdata: any;
  constructor(private route: ActivatedRoute, private router: Router, private data: Data) {
    console.log(" form dash : ", JSON.stringify(this.data.storage));
    this.userdata = this.data.storage;

    this.username = this.route.snapshot.params["username"];
    this.route.queryParams.subscribe(params => {
      this.isLogin = params["isLogin"];
      console.log(" login : ", this.isLogin);
    });
  }

  ngOnInit() {

  }

}
