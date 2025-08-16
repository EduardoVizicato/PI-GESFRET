import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CteStorageComponent } from './cte-storage.component';

describe('CteStorageComponent', () => {
  let component: CteStorageComponent;
  let fixture: ComponentFixture<CteStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CteStorageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CteStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
