import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../models/task'; // importing task model 
import { Router } from "@angular/router";
import { TaskService } from "app/services/tasks.service";
import { UserService } from "app/services/users.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService, UserService]
})
export class TaskComponent implements OnInit {

  taskForm: FormGroup;
  isLoading = false;
  taskFormErrors = {
    trainee: '',
    taskname: '',
    description: '',
    tasktype: ''

  };
  validationMessages = {
    trainee: { required: 'Select trainee.' },
    taskname: {
      required: 'Taskname is required.',
      minlength: 'Taskname must be at least 5 characters.',
      maxlength: 'Taskname can\'t be longer than 20 characters.'
    },
    description: {
      required: 'Task description is required.',
      minlength: 'Task description must be at least 15 characters.',
      maxlength: 'Task description can\'t be longer than 100 characters.'
    },
    tasktype: {
      required: 'Tasktype must be selected.',
    }
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    //lets create taskform
    this.createTaskForm();
    this.onGetTasks();
    this.onGetAllTrainee();
  }
  createTaskForm(): void {
    this.taskForm = this.fb.group({
      trainee: ['', [Validators.required]],
      taskname: [
        '',  //default value 
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ]// validation rule 
      ],
      description: ['', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(100)
      ]// validation rule 
      ],
      tasktype: ['', [Validators.required]]
    });
    console.log(this.taskForm);

    // watch the taskForm and validate it
    // since valueChanges is an observal we need to subscribe it 
    this.taskForm.valueChanges.subscribe(data => this.onWatchAndValidateTaskForm(data));
    this.onWatchAndValidateTaskForm(); // (re)set validation messages now

  }
  onWatchAndValidateTaskForm(data?: any) {
    if (!this.taskForm) { return; }
    //loop over the taskFormErrors fileds
    for (let field in this.taskFormErrors) {
      //clear previous taskForm fields errors (if any)
      this.taskFormErrors[field] = '';

      // grab an input fields by their name
      let input = this.taskForm.get(field);

      if (input.invalid && input.dirty) {
        // loop over the particular formField errors.  & assign in a variable
        for (let error in input.errors) {
          this.taskFormErrors[field] = this.validationMessages[field][error];
        }
      }
    }
  }

  onSubmit() {
    this.isLoading = !false;
    console.log('on submit ', this.taskForm.value);
    this.taskService.addTask(this.taskForm.value)
      .subscribe(
      data => {
        // this.alertService.success('Registration successful', true);
        console.log(" Task added successfully.", data);
        this.isLoading = false;
        this.onGetTasks();
      },
      error => {
        console.log(" Error occured while adding task.");
        this.isLoading = false;
      });
  }
  tasks: any = {};

  onGetTasks() {
    this.isLoading = !false;
    this.taskService.getTaskList()
      .subscribe(
      data => {
        console.log(" Task feching successfully.", data._body);
        this.tasks = JSON.parse(data._body); // since the data is coming as string & ngFor only iterate over array, 
        this.isLoading = false;
      },
      error => {
        console.log(" Error occured while fetching task.");
        this.isLoading = false;
      });
  }
  onDeleteTask(id: string) {
    console.log(" id : ", id);
    this.isLoading = !false;
    this.taskService.deleteTask(id).subscribe(data => {
      console.log(" one task has been deleted.");
      this.isLoading = false;
      this.onGetTasks();
    },
      error => {
        console.log(" Error occured while deleting task.");
        this.isLoading = false;
      });
  }
  onEditTask() {
    this.isLoading = !false;
    // this.taskService.editTask().subscribe(data=>{
    //     console.log(" one task has been edited.");
    //     this.isLoading = false;
    // },
    // error=>{
    //       console.log(" Error occured while editing task.");
    //     this.isLoading = false;
    // });  
  }
  trainees: any = {};
  onGetAllTrainee() {
    this.isLoading = !false;
    this.userService.getTraineeList()
      .subscribe(
      tdata => {
        console.log(" Trainee feching successfully.", tdata);
        this.trainees = tdata.data;
        this.isLoading = false;
      },
      error => {
        console.log(" Error occured while fetching Trainee.");
        this.isLoading = false;
      });
  }
}
