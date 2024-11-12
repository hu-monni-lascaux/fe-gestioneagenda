import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../core/models/user.model';
import {AuthService} from '../../core/services/auth.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.css'
})
export class RegistrationComponent {
    #formBuilder = inject(FormBuilder);
    #authService = inject(AuthService);
    #router = inject(Router);

    registrationForm: FormGroup;

    constructor() {
        this.registrationForm = this.#formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(5)]],
        });
    }


    onSubmit() {
        if (this.registrationForm.valid) {
            const user: UserModel = this.registrationForm.value;

            //todo: test here
            this.#authService.doRegister(user)
                .subscribe({
                    next: result => {
                        console.log(result);
                    },
                    error: err => {
                        this.#router.navigate(['errorPage']);
                    }
                });

            this.registrationForm.reset();
        }
    }
}
