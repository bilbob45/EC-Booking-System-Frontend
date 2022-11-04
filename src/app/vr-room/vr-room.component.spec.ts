import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VRRoomComponent } from './vr-room.component';

describe('VRRoomComponent', () => {
  let component: VRRoomComponent;
  let fixture: ComponentFixture<VRRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VRRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VRRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
