import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.#formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user: UserModel = this.loginForm.value;

      // console.log(user);
      this.#authService.doLogin(user)
        .subscribe({
          next: result => {
            this.loginForm.reset();
            this.#router.navigate(['home'])
          },
          error: err => {
            this.#router.navigate(['errorPage']);
          }
        });
    }
  }

  signupBtn() {
    this.#router.navigate(['register']);
  }
}
