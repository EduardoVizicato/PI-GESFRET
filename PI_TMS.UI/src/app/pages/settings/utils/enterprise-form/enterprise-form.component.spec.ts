import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseFormComponent } from './enterprise-form.component';

describe('EnterpriseFormComponent', () => {
  let component: EnterpriseFormComponent;
  let fixture: ComponentFixture<EnterpriseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterpriseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterpriseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
