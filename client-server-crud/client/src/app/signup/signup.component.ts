import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';// <!-- Model driven Form -->
import { UserService } from "../services/users.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {


  signupForm: FormGroup;
  signupFormErrors = {
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    phone: '',
    notification: ''
  };
  validationMessages = {
    username: {
      required: 'Username is required.',
      minlength: 'Username must be at least 5 characters.',
      maxlength: 'Username can\'t be longer than 50 characters.'
    },
    firstname: {
      required: 'Firstname is required.',
      minlength: 'Firstname must be at least 5 characters.',
      maxlength: 'Firstname can\'t be longer than 20 characters.'
    },
    lastname: {
      required: 'Lastname is required.',
      minlength: 'Lastname must be at least 5 characters.',
      maxlength: 'Lastname can\'t be longer than 20 characters.'
    },
    password: {
      required: 'Password is required.',
      minLength: 'Password must be at least 8 characters.',
      maxlength: 'Password can\'t be longer than 20 characters.',
      // pattern:'Password must contain alpha,number & symbol.'
    },
    email: {
      required: 'Email is required.',
      email: 'Email must be valid',
      pattern: 'Email pattern must be valid',
    },
    phone: {
      required: 'Phone number is required.',
      minlength: 'Minimum length 10',
      maxlength: 'Maximum length 10',
      pattern: 'Only number'
    }
  };



  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.createSignupForm();
  }
  createSignupForm(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      firstname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8),
      Validators.maxLength(20)
        // Validators.pattern('/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s])$/')
      ]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: '',
      notification: 'email'
    });
    console.log(this.signupForm);
    // since valueChanges is an observal we need to subscribe it 
    this.signupForm.valueChanges.subscribe(data => this.onWatchAndValidateSignupForm(data));
  }

  onWatchAndValidateSignupForm(data?: any): void {
    if (!this.signupForm) { return; }
    //loop over the signupFormErrors fileds
    for (let field in this.signupFormErrors) {
      //clear previous signupForm fields errors (if any)
      this.signupFormErrors[field] = '';

      // grab an input fields by their name
      let input = this.signupForm.get(field);

      if (input.invalid && input.dirty) {
        // loop over the particular formField errors.  & assign in a variable
        for (let error in input.errors) {
          this.signupFormErrors[field] = this.validationMessages[field][error];
        }
      }
    }

  }
  setNotificationType(notifyVia: string): void {
    const phoneControl = this.signupForm.get('phone');

    if (notifyVia === "text") {
      //set the phone validators to required
      phoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('/\d+/')]);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity(); //re-evalute the validation & validity 
  }
  onSubmit = function () {
    console.log('user', this.signupForm.value);
    this.userService.signup(this.signupForm.value).subscribe(data => {
      console.log(" Signup successfully.", data);
      this.isLoading = false;
      this.router.navigate(['/signin']);
    },
      error => {
        console.log(" Error occured while signup.");
        this.isLoading = false;
      });
  }
}
