import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services";
import {first} from "rxjs";

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss'],
})

export class Login2Component {
  password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

// export class Login2Component implements OnInit {
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
//     // reset login status
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
//     this.authenticationService.login(this.f['username'].value, this.f['password'].value)
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
