/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DefaultComponentService } from './DefaultComponent.service';

describe('Service: DefaultComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultComponentService]
    });
  });

  it('should ...', inject([DefaultComponentService], (service: DefaultComponentService) => {
    expect(service).toBeTruthy();
  }));
});
