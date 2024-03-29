import { BrowserModule } from '@angular/platform-browser';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HeroesModule } from './heroes/heroes.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HighlightDirective } from './highlight.directive';
import {HttpClientModule} from '@angular/common/http';
import { MyHttpComponent } from './my-http/my-http.component';
import { MyComponentTemplateComponent } from './my-component-template/my-component-template.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    AboutComponent,
    HighlightDirective,
    MyHttpComponent,
    MyComponentTemplateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HeroesModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor() {}
}
