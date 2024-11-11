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

    this.http.post<string>('http://localhost:8080/api/v1/auth', {
      username: username,
      password: password,
    })
      .subscribe(token => {
        this.#token = token;
        console.log(this.#token);
      });
  }
}
