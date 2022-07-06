import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import {ActivatedRoute} from '@angular/router';
import {HeroesService} from './heroes.service';
import {empty, of} from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  beforeEach(waitForAsync(() => {
    heroesServiceSpy = jasmine.createSpyObj([], ['heroes', 'paramMap']);
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      providers: [{provide: ActivatedRoute, useValue: {
        paramMap: empty()
        }}, {provide: HeroesService, useValue: heroesServiceSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    (Object.getOwnPropertyDescriptor(heroesServiceSpy, 'heroes').get as any).and.returnValue([
      {
        name: 'Boi', age: 1
      }
    ]);
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.heroes.length).toEqual(1);
  });
});
