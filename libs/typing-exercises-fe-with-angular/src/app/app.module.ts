import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KeyboardModule } from './keyboard/keyboard.module';
import { InputExerciseModule } from './input-exercise/input-exercise.module';
import { SpeedCountModule } from './speed-count/speed-count.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {createCustomElement} from "@angular/elements";

@NgModule({
  declarations: [],
  imports: [
      AppComponent,
    BrowserModule,
    KeyboardModule,
    InputExerciseModule,
    SpeedCountModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  ngDoBootstrap() {}
  constructor(private injector: Injector) {
// 将组件转换为自定义元素
    const customElement = createCustomElement(AppComponent, { injector });
    // 注册到浏览器自定义元素注册表
    customElements.define('angular-typing-execises', customElement);
  }
}
