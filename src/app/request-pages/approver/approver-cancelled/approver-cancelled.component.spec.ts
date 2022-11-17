import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverCancelledComponent } from './approver-cancelled.component';

describe('ApproverCancelledComponent', () => {
  let component: ApproverCancelledComponent;
  let fixture: ComponentFixture<ApproverCancelledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverCancelledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproverCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
