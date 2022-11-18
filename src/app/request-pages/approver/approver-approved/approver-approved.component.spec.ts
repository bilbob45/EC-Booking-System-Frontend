import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverApprovedComponent } from './approver-approved.component';

describe('ApproverApprovedComponent', () => {
  let component: ApproverApprovedComponent;
  let fixture: ComponentFixture<ApproverApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverApprovedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproverApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
