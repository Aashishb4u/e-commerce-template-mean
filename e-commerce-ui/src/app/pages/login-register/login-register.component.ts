import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../services/shared.service";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginEnabled: any = true;
  constructor(public sharedService: SharedService, private formBuilder: FormBuilder, public apiService: ApiService, public router: Router) { }

  ngOnInit() {
    this.sharedService.showSpinner.next(false);
    this.sharedService.showBrandSpinner.next(false);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
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
    if (userRole.toLowerCase() === 'customer') {
      this.router.navigate(['/customer-dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  goToLanding() {
    this.router.navigate(['']);
  }
}
