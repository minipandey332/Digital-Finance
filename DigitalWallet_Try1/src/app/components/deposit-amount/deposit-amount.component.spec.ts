import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositAmountComponent } from './deposit-amount.component';

describe('DepositAmountComponent', () => {
  let component: DepositAmountComponent;
  let fixture: ComponentFixture<DepositAmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositAmountComponent]
    });
    fixture = TestBed.createComponent(DepositAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
