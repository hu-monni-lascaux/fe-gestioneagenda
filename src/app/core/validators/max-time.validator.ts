import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxTimeValidator(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = new Date(control.get('start')?.value);
    const endDate = new Date(control.get('end')?.value);

    let differenceInMinutes: number = 0;

    if(startDate && endDate) {
      const differenceInMs = endDate.getTime() - startDate.getTime();
      differenceInMinutes = Math.floor(differenceInMs / 60000);
      console.log(differenceInMinutes);
    }

    return differenceInMinutes > max ? {maxTimeExceeded: true} : null;
  }
}
