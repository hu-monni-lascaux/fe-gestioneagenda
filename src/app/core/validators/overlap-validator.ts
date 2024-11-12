import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { EventImpl } from '@fullcalendar/core/internal.js';

export function overlapValidator(existingEvents: EventImpl[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = new Date(control.get('start')?.value);
    const endDate = new Date(control.get('end')?.value);

    // Verifica se le date sono valide
    if (!startDate || !endDate) {
      return null;
    }

    const isOverlapping = existingEvents?.some(event => {
      const eventStart = event.start;
      const eventEnd = event.end;
      return (startDate < eventEnd! && endDate > eventStart!);
    });

    return isOverlapping ? {overlapError: true} : null;
  };
}
