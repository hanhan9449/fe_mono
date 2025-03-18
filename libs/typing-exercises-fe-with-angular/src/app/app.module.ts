import {
  Injector,
  NgModule,
  inject,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [],
  imports: [
    AppComponent,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [provideExperimentalZonelessChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppModule {
  private injector = inject(Injector);

  ngDoBootstrap() {}
  constructor() {
    const injector = this.injector;

    // 将组件转换为自定义元素
    const customElement = createCustomElement(AppComponent, { injector });
    // 注册到浏览器自定义元素注册表
    customElements.define('angular-typing-execises', customElement);
  }
}
