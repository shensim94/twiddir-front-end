import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  responseText = '';
  alertClass = '';
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      usernameOrEmail:[null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  get usernameOrEmail() {
    return this.loginForm.get('usernameOrEmail');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmitHandler() {
    
    this.authService.onLogin(this.loginForm.value).subscribe(
      (data: any) => {
        
        localStorage.setItem('token', data['access_token'])

        this.router.navigateByUrl('/');
      },
      (error) => {
        this.responseText = 'invalid email or password';
        this.alertClass = 'alert alert-danger';
      }
    )
  }
}
