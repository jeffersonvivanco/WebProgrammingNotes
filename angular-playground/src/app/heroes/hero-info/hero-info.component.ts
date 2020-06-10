import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.css']
})
export class HeroInfoComponent implements OnInit {
  heroName: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('[init] hero-info');
    this.route.paramMap.subscribe(params => this.heroName = params.get('name'));
  }

}
