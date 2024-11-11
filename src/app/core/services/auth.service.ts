import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/enums/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #token?: string;

  constructor(private http: HttpClient) {
  }

  doLogin(user: UserModel) {
    this.loginRequest(user);
  }

  private loginRequest(user: UserModel) {
    const {username, password} = user;

    this.http.post<{ jwtToken: string }>('http://localhost:8080/api/v1/auth/authenticate', {
      username: username,
      password: password,
    })
      .subscribe(data => {
        this.#token = data.jwtToken;
        localStorage.setItem('token', this.#token);
      });
  }

  doRegister(user: UserModel) {
    const {username, password, email} = user;
    this.http.post<{ jwtToken: string }>('http://localhost:8080/api/v1/auth/register', {
      username: username,
      password: password,
      email: email,
    })
    .subscribe(data => {
      this.#token = data.jwtToken;
      localStorage.setItem('token', this.#token);
    });
  }
}
