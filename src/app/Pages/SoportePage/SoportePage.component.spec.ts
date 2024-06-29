/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SoportePageComponent } from './SoportePage.component';

describe('SoportePageComponent', () => {
  let component: SoportePageComponent;
  let fixture: ComponentFixture<SoportePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoportePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoportePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
