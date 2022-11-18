import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverAwaitingApprovalComponent } from './approver-awaiting-approval.component';

describe('ApproverAwaitingApprovalComponent', () => {
  let component: ApproverAwaitingApprovalComponent;
  let fixture: ComponentFixture<ApproverAwaitingApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverAwaitingApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproverAwaitingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
