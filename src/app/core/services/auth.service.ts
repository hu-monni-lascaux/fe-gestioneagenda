import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {catchError, tap, throwError} from "rxjs";
import {jwtDecode} from "jwt-decode";

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
            catchError(this.handleError)
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
                catchError(this.handleError)
            );
    }

    doLogout(): void {
        localStorage.removeItem('token');
    }

    isTokenExpired() {
        const token = this.getToken();
        if (!token) {
            return true;
        }

        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(); // la doppia negazione converte il token in boolean
    }

    private getToken() {
        return localStorage.getItem('token');
    }

    private handleError() {
        return throwError(() => new Error('Errore di autenticazione, riprova più tardi.'));
    }
}
