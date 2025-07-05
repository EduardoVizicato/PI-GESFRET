import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightCalculationComponent } from './freight-calculation.component';

describe('FreightCalculationComponent', () => {
  let component: FreightCalculationComponent;
  let fixture: ComponentFixture<FreightCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreightCalculationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreightCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
