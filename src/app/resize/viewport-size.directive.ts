import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { ResizeService } from './resize.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ifViewportSize]'
})
export class ViewportSize implements OnDestroy {

  private _hasView = false;
  private _currentState: string;
  private _resizeSubscription: Subscription;
  private _templateViewportSize: string;

  constructor(private resizeService: ResizeService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set ifViewportSize(size: string) {
    this._templateViewportSize = size;
    this._resizeSubscription = this.resizeService.resizeState.subscribe(this.updateViewState.bind(this));
  }

  updateViewState(value: string) {
    if (this._ifValueChanged(this._currentState, value)) {
      console.log('updateViewState');
      this._currentState = value;
      this._updateView();
    }
  }

  private _updateView() {
    if (this._templateViewportSize === this._currentState && !this._hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this._hasView = true;
    } else if (this._templateViewportSize !== this._currentState && this._hasView) {
      this.viewContainer.clear();
      this._hasView = false;
    }
  }

  ngOnDestroy() {
    if (this._resizeSubscription) {
      this._resizeSubscription.unsubscribe();
    }
  }

  private _ifValueChanged(oldValue: any, newValue: any): boolean {
    if (oldValue === newValue) {
      return false;
    } else {
      this._currentState = newValue;
      return true;
    }
  }

}
