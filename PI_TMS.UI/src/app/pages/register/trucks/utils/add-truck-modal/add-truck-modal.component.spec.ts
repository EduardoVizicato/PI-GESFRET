import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTruckModalComponent } from './add-truck-modal.component';

describe('AddTruckModalComponent', () => {
  let component: AddTruckModalComponent;
  let fixture: ComponentFixture<AddTruckModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTruckModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTruckModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
