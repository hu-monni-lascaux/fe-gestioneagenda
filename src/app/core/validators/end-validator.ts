import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function endValidator(start: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = new Date(start.value);
    const endDate = new Date(control.value);
    return endDate > startDate ? null : {endBeforeStart: true};
  };
}
