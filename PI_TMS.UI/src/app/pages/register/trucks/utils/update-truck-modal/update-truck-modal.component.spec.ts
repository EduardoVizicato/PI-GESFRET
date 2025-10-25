import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTruckModalComponent } from './update-truck-modal.component';

describe('UpdateTruckModalComponent', () => {
  let component: UpdateTruckModalComponent;
  let fixture: ComponentFixture<UpdateTruckModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTruckModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTruckModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
