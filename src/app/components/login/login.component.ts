import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../core/models/user.model';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  #formBuilder = inject(FormBuilder);
  #loginService = inject(LoginService);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.#formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      const user: UserModel = this.loginForm.value;

      // console.log(user);
      this.#loginService.doLogin(user);

      this.loginForm.reset();
    }
  }

}
