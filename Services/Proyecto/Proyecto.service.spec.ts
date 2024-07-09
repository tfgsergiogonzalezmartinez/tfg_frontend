/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProyectoService } from './Proyecto.service';

describe('Service: Proyecto', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProyectoService]
    });
  });

  it('should ...', inject([ProyectoService], (service: ProyectoService) => {
    expect(service).toBeTruthy();
  }));
});
