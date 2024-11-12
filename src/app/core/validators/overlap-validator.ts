import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { EventImpl } from '@fullcalendar/core/internal.js';
import { EventInput } from '@fullcalendar/core';

export function overlapValidator(existingEvents: EventImpl[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = new Date(control.get('start')?.value);
    const endDate = new Date(control.get('end')?.value);
    console.log(existingEvents);

    // Verifica se le date sono valide
    if (!startDate || !endDate) {
      return null;
    }

    const isOverlapping = existingEvents?.some(event => {
      return (startDate < event.end! && endDate > event.start!);
    });

    return isOverlapping ? {overlapError: true} : null;
  };
}
