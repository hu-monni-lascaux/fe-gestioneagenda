import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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
}
