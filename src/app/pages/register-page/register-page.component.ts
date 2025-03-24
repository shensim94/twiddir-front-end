import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  responseText = '';
  alertClass = '';
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      username:[null, [Validators.required]],
      email:[null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  onSubmitHandler() {
    console.log(this.registrationForm.value);
    this.authService.onRegister(this.registrationForm.value).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.log(error);
        this.responseText = error.error.message;
        this.alertClass = 'alert alert-danger';
      }
    )
  }
}
