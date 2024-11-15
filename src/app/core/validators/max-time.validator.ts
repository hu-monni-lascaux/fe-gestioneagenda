import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxTimeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = new Date(control.get('start')?.value);
    const endDate = new Date(control.get('end')?.value);

    let differenceInMinutes: number = 0;

    if(startDate && endDate) {
      const differenceInMs = endDate.getTime() - startDate.getTime();
      differenceInMinutes = Math.floor(differenceInMs / 60000);
      console.log(differenceInMinutes);
    }

    return differenceInMinutes > 15 ? {maxTimeExceeded: true} : null;
  }
}
