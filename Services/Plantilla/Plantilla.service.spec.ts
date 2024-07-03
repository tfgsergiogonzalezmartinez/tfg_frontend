/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlantillaService } from './Plantilla.service';

describe('Service: Plantilla', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlantillaService]
    });
  });

  it('should ...', inject([PlantillaService], (service: PlantillaService) => {
    expect(service).toBeTruthy();
  }));
});
