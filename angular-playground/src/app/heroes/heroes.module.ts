import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { HeroInfoComponent } from './hero-info/hero-info.component';
import {RouteReuseStrategy} from '@angular/router';
import {HeroesReuseStrategy} from './heroes-reuse-strategy';


@NgModule({
  declarations: [HeroesComponent, HeroInfoComponent],
  imports: [
    CommonModule,
    HeroesRoutingModule
  ],
  providers: [{provide: RouteReuseStrategy, useClass: HeroesReuseStrategy}]
})
export class HeroesModule { }
