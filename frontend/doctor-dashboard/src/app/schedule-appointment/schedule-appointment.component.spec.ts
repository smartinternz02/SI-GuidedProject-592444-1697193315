import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAppointmentComponent } from './schedule-appointment.component';

describe('ScheduleAppointmentComponent', () => {
  let component: ScheduleAppointmentComponent;
  let fixture: ComponentFixture<ScheduleAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleAppointmentComponent]
    });
    fixture = TestBed.createComponent(ScheduleAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
