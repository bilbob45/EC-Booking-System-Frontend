import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheColiseumComponent } from './the-coliseum.component';

describe('TheColiseumComponent', () => {
  let component: TheColiseumComponent;
  let fixture: ComponentFixture<TheColiseumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheColiseumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheColiseumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
