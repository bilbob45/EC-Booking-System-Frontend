import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuttleDiscoveryComponent } from './the-coliseum.component';

describe('ShuttleDiscoveryComponent', () => {
  let component: ShuttleDiscoveryComponent;
  let fixture: ComponentFixture<ShuttleDiscoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShuttleDiscoveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShuttleDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
