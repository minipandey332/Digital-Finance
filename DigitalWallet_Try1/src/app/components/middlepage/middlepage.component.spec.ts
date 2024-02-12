import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlepageComponent } from './middlepage.component';

describe('MiddlepageComponent', () => {
  let component: MiddlepageComponent;
  let fixture: ComponentFixture<MiddlepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiddlepageComponent]
    });
    fixture = TestBed.createComponent(MiddlepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
