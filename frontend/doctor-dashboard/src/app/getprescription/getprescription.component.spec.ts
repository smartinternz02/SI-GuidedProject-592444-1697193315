import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetprescriptionComponent } from './getprescription.component';

describe('GetprescriptionComponent', () => {
  let component: GetprescriptionComponent;
  let fixture: ComponentFixture<GetprescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetprescriptionComponent]
    });
    fixture = TestBed.createComponent(GetprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
