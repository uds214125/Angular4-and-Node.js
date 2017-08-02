/**
    @description : mainly user (admin) signin, signup & getting tranee as user list 
    @since : 30-07-2017
    @author : uds214125@gmail.com
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/throw';
import { Signup } from '../models/signup';
import { Signin } from '../models/signin';
import { Observable } from "rxjs/Rx";
import { Data } from '../shared/providers/data';


@Injectable()
export class UserService {

    constructor(private http: Http, private data: Data) { }

    signup(signup: Signup) {
        console.log(" -------------> User's data ", signup);
        return this.http.post('http://localhost:3000/v1/register', signup);
    }

    signin(username: string, password: string) {
        console.log(" -------------> User's username ", username, " password : ", password);
        // one of the another way to pass data in post request 
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = new URLSearchParams();
        data.append('username', username);
        data.append('password', password);
        let body = data.toString()
        return this.http.post('http://localhost:3000/v1/signin', body, { headers: headers })
            .map((result: Response) => result.json());
    }

    signout() {
        //remove everything from storage, localstorage, sessionstorage , cookies 
        this.data.storage = null;
        sessionStorage.removeItem('token');
    }

    getTraineeList() { // to get all users list
        return this.http.get('http://localhost:3000/v1/getTraineeList')
            .map((result: Response) => result.json());
    }
}  