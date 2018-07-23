import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResizeModule } from './resize/resize.module';
import { TestComponent } from './test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    ResizeModule.forRoot({ medium: 1000, large: 1300 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
