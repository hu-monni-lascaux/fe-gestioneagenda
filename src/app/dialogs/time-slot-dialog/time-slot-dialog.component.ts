import { Component, inject } from '@angular/core';
import { Day } from '../../core/models/enums/days';
import { TimeSlot } from '../../core/models/enums/time-slot';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-time-slot-dialog',
  templateUrl: './time-slot-dialog.component.html',
  styleUrl: './time-slot-dialog.component.css'
})
export class TimeSlotDialogComponent {
  #dialogRef = inject(MatDialogRef<TimeSlotDialogComponent>);
  daysForm: FormGroup;

  daysOfWeek = Object.values(Day).filter(value => isNaN(Number(value))) as string[];  // ['Lunedì', 'Martedì', ...]
  timeSlots = Object.values(TimeSlot);  // ['09:00-13:00', '14:00-18:00']

  constructor(private fb: FormBuilder) {
    this.daysForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      maxAppointmentTime: [15]
    });

    // Creazione di un form control per ogni giorno della settimana
    this.daysOfWeek.forEach(day => {
      this.daysForm.addControl(day, new FormControl([]));
    });
  }

  onSave(): void {
    if (this.daysForm.valid) {
      this.#dialogRef.close(this.daysForm.value);
    }
  }

  onCancel() {
    this.#dialogRef.close();
  }
}
