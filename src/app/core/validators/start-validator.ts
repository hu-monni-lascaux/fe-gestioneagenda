import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function startValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = new Date(control.value);
    const now = new Date();
    return startDate > now ? null : {startInPast: true};
  };
}
