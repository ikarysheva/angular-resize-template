import { NgModule, Optional, SkipSelf, ModuleWithProviders, ValueProvider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IConfig, RESIZE_CONFIG, RESIZE_PROVIDER } from './resize.service';
import { ViewportSize } from './viewport-size.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ViewportSize],
  providers: [RESIZE_PROVIDER],
  exports: [ViewportSize]
})
export class ResizeModule {
  constructor(@Optional() @SkipSelf() parentModule: ResizeModule) {
    if (parentModule) {
      throw new Error(
        'ResizeModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: IConfig): ModuleWithProviders {
    return {
      ngModule: ResizeModule,
      providers: [
        { provide: RESIZE_CONFIG, useValue: config }
      ]
    };
  }

}
