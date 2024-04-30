import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../services/shared.service";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {passwordMatchValidator} from "../../validators/passwordMatch.validator";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPasswordForm: FormGroup;
  loginEnabled: any = true;
  viewMode: any = 'login';
  constructor(public sharedService: SharedService, private formBuilder: FormBuilder, public apiService: ApiService, public router: Router) { }

  ngOnInit() {
    this.sharedService.showSpinner.next(false);
    this.sharedService.showBrandSpinner.next(false);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

   this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },{
      // Apply the custom validator to the form group
      validators: passwordMatchValidator
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const data = {
        firstName: this.registerForm.get('firstName')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        email: this.registerForm.get('email')?.value,
        phoneNumber: this.registerForm.get('phoneNumber')?.value,
        password: this.registerForm.get('password')?.value
      };
      this.apiService.register(data).subscribe(
        res => this.loginSuccess(res),
        error => {
          this.apiService.commonError(error);
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
      this.apiService.showToast('Please Complete Registration form');
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const data = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.apiService.login(data).subscribe(
        res => this.loginSuccess(res),
        error => {
          this.apiService.commonError(error);
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
      this.apiService.showToast('Please Enter Valid Email and Password');
    }
  }

  loginSuccess(res) {
    console.log(res);
    const userRole = res.user.role.name;
    this.sharedService.showSpinner.next(false);
    // if (userRole.toLowerCase() === 'customer') {
    //   this.router.navigate(['/customer-dashboard']);
    // } else {
      this.router.navigate(['/dashboard']);
    // }
  }

  goToLanding() {
    this.router.navigate(['']);
  }
}
