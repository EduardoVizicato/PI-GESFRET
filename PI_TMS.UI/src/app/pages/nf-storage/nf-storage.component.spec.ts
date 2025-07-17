import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfStorageComponent } from './nf-storage.component';

describe('NfStorageComponent', () => {
  let component: NfStorageComponent;
  let fixture: ComponentFixture<NfStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NfStorageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NfStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
