import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrucksComponent } from './trucks.component';

describe('TrucksComponent', () => {
  let component: TrucksComponent;
  let fixture: ComponentFixture<TrucksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrucksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
