import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day0Component } from './day0.component';

describe('Day0Component', () => {
  let component: Day0Component;
  let fixture: ComponentFixture<Day0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day0Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
