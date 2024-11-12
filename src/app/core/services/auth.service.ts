import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {Role} from '../models/enums/roles';
import {tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    #token?: string;
    #apiUrl: string = "http://localhost:8081/api/v1/auth"

    constructor(private http: HttpClient) {
    }

    doLogin(user: UserModel) {
        const {username, password} = user;

        return this.http.post<{ jwtToken: string }>(`${this.#apiUrl}/authenticate`, {
            username: username,
            password: password,
        }).pipe(
            tap(data => localStorage.setItem('token', data.jwtToken)),
            // catchError()
        );
    }

    doRegister(user: UserModel) {
        const {username, password, email} = user;
        return this.http.post<{ jwtToken: string }>(`${this.#apiUrl}/register`, {
            username: username,
            password: password,
            email: email,
        })
            .pipe(
                tap(data => localStorage.setItem('token', data.jwtToken)),
                // catchError()
            );
    }

    doLogout(): void {
        localStorage.removeItem('token');
    }
}
