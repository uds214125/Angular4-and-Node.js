/**
    @description : mainly task CRUD service
    @since : 30-07-2017
    @author : uds214125@gmail.com
 */

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import { Task } from '../models/task';
import { Observable } from "rxjs/Rx";

@Injectable()
export class TaskService {
    getError: any;
    constructor(private http: Http) { }

    getTaskList(): Observable<any> {
        return this.http.get('http://localhost:3000/v1/getTask');
    }
    addTask(task: Task) {
        console.log(" -------------> Addding task", task);
        return this.http.post('http://localhost:3000/v1/addTask', task);
    }
    deleteTask(id) {
        console.log(" id : ", id);
        return this.http.delete('http://localhost:3000/v1/deleteTask/' + id);
    }

}
