import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have heroes initialized to 3', function () {
    expect(service.heroes.length).toBe(3);
  });
});
