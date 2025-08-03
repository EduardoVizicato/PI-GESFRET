import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraveltestComponent } from './traveltest.component';

describe('TraveltestComponent', () => {
  let component: TraveltestComponent;
  let fixture: ComponentFixture<TraveltestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraveltestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraveltestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
