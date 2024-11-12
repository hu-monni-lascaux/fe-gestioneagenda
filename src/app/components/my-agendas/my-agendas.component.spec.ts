import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAgendasComponent } from './my-agendas.component';

describe('MyAgendasComponent', () => {
  let component: MyAgendasComponent;
  let fixture: ComponentFixture<MyAgendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAgendasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
