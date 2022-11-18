import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverCompletedComponent } from './approver-completed.component';

describe('ApproverCompletedComponent', () => {
  let component: ApproverCompletedComponent;
  let fixture: ComponentFixture<ApproverCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproverCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
