import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services";
import {first} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  error = '';
  showPassword: boolean = false
  protected login: string;
  protected password: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login123 status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }

    this.loading = true;
    this.authenticationService.login(this.login, this.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

// export class LoginComponent implements OnInit {
//   // @ts-ignore
//   loginForm: FormGroup;
//   loading = false;
//   submitted = false;
//   returnUrl: string | undefined;
//   error = 'Неверно указан логин или пароль';
//
//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private authenticationService: AuthenticationService) {
//   }
//
//   ngOnInit() {
//     this.loginForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//
//     // reset login123 status
//     this.authenticationService.logout();
//
//     // get return url from route parameters or default to '/'
//     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//   }
//
//   // convenience getter for easy access to form fields
//   get f() {
//     return this.loginForm.controls;
//   }
//
//   onSubmit() {
//     this.submitted = true;
//
//     // stop here if form is invalid
//     if (this.loginForm.invalid) {
//       return;
//     }
//
//     this.loading = true;
//     this.authenticationService.login123(this.f['username'].value, this.f['password'].value)
//       .pipe(first())
//       .subscribe(
//         data => {
//           this.router.navigate([this.returnUrl]);
//         },
//         error => {
//           this.error = error;
//           this.loading = false;
//         });
//   }
// }
