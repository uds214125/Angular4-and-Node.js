import { Component, OnInit } from '@angular/core';
import { NgFor } from "@angular/common";
import  {FormsModule} from "@angular/forms";
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import {UserService} from '../services/users.service'; 
import { Data } from '../shared/providers/data';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers:[UserService]
})
 
  export class SigninComponent implements OnInit {
	  
    constructor(private router:Router,private route:ActivatedRoute,private userService:UserService, private data: Data){
       setTimeout(function(){
       },2000);   

    }
    creds="";
    wrongcreds="";
    username="";
    password="";
    isLogin=false;  
    onSignin(){
              
        console.log(this.username+ " and " + this.password);
        // this.router.navigateByUrl(this.returnUrl);
        this.userService.signin(this.username,this.password).subscribe(data => {
            console.log(" login success" ,data);             
            this.isLogin=!this.isLogin;
            sessionStorage.setItem('token',data.token);
            //2nd way to pass data in other components 
            this.data.storage = {
                "username": data.username,                
                "firstname": data.firstname,
                "lastname":data.lastname,
                "address": {
                    "city": "UDS Nagar",
                    "state": "UDSPUR"
                }
            }

            //1st way to pass data in other components 
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "username": data.username,
                    "email":data.email
                }
            };
            // this.router.navigate(['/dashboard'], { queryParams: { username: data.username }});
            this.router.navigate(['/dashboard'], navigationExtras);
        }, error => {
            console.log(error.json());
        });
               
        
    }

    onUpdatePassword(event:Event){
        this.creds=(<HTMLInputElement>event.target).value;
        console.log(this.creds);
    }
    
    signoutMsg="";
    ngOnInit(){
        this.userService.signout();
        this.route.queryParams
            .subscribe(params => {
                this.signoutMsg = params['message'];
            });
    }

}