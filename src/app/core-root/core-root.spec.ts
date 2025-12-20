import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreRoot } from './core-root';

describe('CoreRoot', () => {
  let component: CoreRoot;
  let fixture: ComponentFixture<CoreRoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreRoot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreRoot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
