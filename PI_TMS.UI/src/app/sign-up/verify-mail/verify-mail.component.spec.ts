import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyMailComponent } from './verify-mail.component';

describe('VerifyMailComponent', () => {
  let component: VerifyMailComponent;
  let fixture: ComponentFixture<VerifyMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyMailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
