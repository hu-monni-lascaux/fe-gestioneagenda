import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent implements OnInit {
  #router = inject(Router);
  count: number = 5;

  ngOnInit() {
    interval(1000)
      .pipe(
        takeWhile(() => this.count > 0)
      )
      .subscribe(() => {
        this.count--;
        if (this.count === 0) {
          this.#router.navigate(['home']);
        }
      });
  }
}
