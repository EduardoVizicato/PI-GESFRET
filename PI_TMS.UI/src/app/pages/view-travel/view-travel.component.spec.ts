import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTravelComponent } from './view-travel.component';

describe('ViewTravelComponent', () => {
  let component: ViewTravelComponent;
  let fixture: ComponentFixture<ViewTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
