import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { startValidator } from '../../core/validators/start-validator';
import { endValidator } from '../../core/validators/end-validator';
import { overlapValidator } from '../../core/validators/overlap-validator';

@Component({
  selector: 'app-create-appointment-dialog',
  templateUrl: './create-appointment-dialog.component.html',
  styleUrl: './create-appointment-dialog.component.css'
})
export class CreateAppointmentDialogComponent {
  #formBuilder = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<CreateAppointmentDialogComponent>);

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.#formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        text: [''],
        start: [data.start, [Validators.required, startValidator()]],
        end: [data.end, Validators.required],
      },
      {validators: overlapValidator(this.data.existingEvents)});

    this.form.controls[ 'end' ].setValidators([Validators.required, endValidator(this.form.controls[ 'start' ])]);
    this.form.controls[ 'end' ].updateValueAndValidity();
    this.form.controls[ 'start' ].valueChanges.subscribe(() => {
      this.form.controls[ 'end' ].updateValueAndValidity();
    });
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
