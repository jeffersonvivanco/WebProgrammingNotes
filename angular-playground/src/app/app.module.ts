import { BrowserModule } from '@angular/platform-browser';
import {ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicFormComponent } from './basic-form/basic-form.component';
import {BasicFormService} from './basic-form/basic-form.service';
import {createCustomElement} from '@angular/elements';

declare const APPLICATION;

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
  // bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}
  ngDoBootstrap(appRef: ApplicationRef): void {
    // if (typeof APPLICATION !== 'undefined' && APPLICATION === 'micro') {
    //   const basicFormElement = createCustomElement(BasicFormComponent, {injector: this.injector});
    //   customElements.define('basic-form', basicFormElement);
    // } else {
    //   appRef.bootstrap(AppComponent);
    // }
    const basicFormElement = createCustomElement(BasicFormComponent, {injector: this.injector});
    customElements.define('basic-form', basicFormElement);
  }
}
