import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverDeniedComponent } from './approver-denied.component';

describe('ApproverDeniedComponent', () => {
  let component: ApproverDeniedComponent;
  let fixture: ComponentFixture<ApproverDeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverDeniedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproverDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
