import { Injectable, InjectionToken, Inject, Optional, inject } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { startWith, defaultIfEmpty, map } from 'rxjs/operators';


export const RESIZE_CONFIG: InjectionToken<IConfig> = new InjectionToken<IConfig>('RESIZE_CONFIG');

export interface IConfig {
  medium: number;
  large: number;
}


@Injectable({
  providedIn: 'root',
  deps: [[RESIZE_CONFIG]],
})
export class ResizeService {

  private _window: any = null;

  public resizeState: Observable<string>;

  constructor(@Inject(RESIZE_CONFIG) public config: IConfig) {

    this._window = (typeof window !== 'undefined') ? window : null;
    const _resize$ = fromEvent(this._window, 'resize')
      .pipe(
        defaultIfEmpty(),
        startWith(this._window.innerWidth)
      );

    this.resizeState = _resize$.pipe(map(this.sizeOperations.bind(this)));
  }

  public sizeOperations(): any {
    let size = null;
    if (this._window !== null) {
      const viewportWidth = this._window.innerWidth;
      if (viewportWidth < this.config.medium) {
        size = 'small';
      } else if (this.config.medium <= viewportWidth && viewportWidth < this.config.large) {
        size = 'medium';
      } else if (this.config.large <= viewportWidth) {
        size = 'large';
      }
    }
    return size;
  }
}


