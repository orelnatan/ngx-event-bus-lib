import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEventBus } from './ngx-event-bus';

describe('NgxEventBus', () => {
  let component: NgxEventBus;
  let fixture: ComponentFixture<NgxEventBus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxEventBus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxEventBus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
