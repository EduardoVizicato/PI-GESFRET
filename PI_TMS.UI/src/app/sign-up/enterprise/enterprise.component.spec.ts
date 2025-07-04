import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseComponent } from './enterprise.component';

describe('EnterpriseComponent', () => {
  let component: EnterpriseComponent;
  let fixture: ComponentFixture<EnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterpriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
