import { Component, OnInit } from '@angular/core';
import {Hero} from './hero';
import {ActivatedRoute} from "@angular/router";
import {HeroesService} from "./heroes.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private route: ActivatedRoute, private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroes = this.heroesService.heroes;
    this.route.paramMap.subscribe(params => {
      if (params.has('name')) {
        this.heroes.forEach(h => {
          if (h.name === params.get('name')) {
            h.visited = true;
          }
        });
      }
    });
  }

}
