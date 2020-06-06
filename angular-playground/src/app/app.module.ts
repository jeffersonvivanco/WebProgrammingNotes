import { BrowserModule } from '@angular/platform-browser';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicFormComponent } from './basic-form/basic-form.component';
import {BasicFormService} from './basic-form/basic-form.service';

@NgModule({
  declarations: [
    AppComponent,
    BasicFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BasicFormService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor() {}
}
