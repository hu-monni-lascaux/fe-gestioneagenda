import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendeComponent } from './agende.component';

describe('AgendeComponent', () => {
  let component: AgendeComponent;
  let fixture: ComponentFixture<AgendeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
