/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ColoresService } from './Colores.service';

describe('Service: Colores', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColoresService]
    });
  });

  it('should ...', inject([ColoresService], (service: ColoresService) => {
    expect(service).toBeTruthy();
  }));
});
