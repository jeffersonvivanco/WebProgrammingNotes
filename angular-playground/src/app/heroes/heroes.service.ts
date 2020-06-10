import { Injectable } from '@angular/core';
import {Hero} from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  heroes: Hero[] = [];
  constructor() {
    const batman = new Hero('Batman', 30);
    const hulk = new Hero('Hulk', 31);
    const superman = new Hero('Superman', 32);
    this.heroes.push(batman, hulk, superman);
  }
}
