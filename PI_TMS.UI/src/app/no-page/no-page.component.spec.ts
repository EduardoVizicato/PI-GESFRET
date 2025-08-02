import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPageComponent } from './no-page.component';

describe('NoPageComponent', () => {
  let component: NoPageComponent;
  let fixture: ComponentFixture<NoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
