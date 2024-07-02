/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImportadorService } from './Importador.service';

describe('Service: Importador', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImportadorService]
    });
  });

  it('should ...', inject([ImportadorService], (service: ImportadorService) => {
    expect(service).toBeTruthy();
  }));
});
