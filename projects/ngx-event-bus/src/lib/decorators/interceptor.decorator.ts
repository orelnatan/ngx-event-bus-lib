import { Renderer2, RendererFactory2, inject, ɵPipeDef } from "@angular/core";

import { initListeners, isPipe } from "../utils";
import { DECORATOR_APPLIED } from "../consts";
import { Event, Args } from "../models";

export function Interceptor<T extends Args>(events: Event[] = []): (orgConstructor: T) => void {  
  return function(orgConstructor: T): void {
    let listeners: Function[] = [];
  
    orgConstructor.prototype[DECORATOR_APPLIED] = true;
    orgConstructor.prototype._constructor = function(instance: InstanceType<T>): void {
      const renderer2: Renderer2 = inject(RendererFactory2).createRenderer(null, null);

      listeners = initListeners(
        events, instance, renderer2);
    }
    
    const onDestroy: Function = orgConstructor.prototype.ngOnDestroy;
    orgConstructor.prototype.ngOnDestroy = function(): void {
      listeners.map(
        (listener: Function) => listener());
       
      onDestroy && onDestroy.call(this);
    };

    if(isPipe<T>(orgConstructor)) {
      const def: ɵPipeDef<T> = orgConstructor.prototype.constructor.ɵpipe;
      def.onDestroy = function (): void {
        listeners.map(
          (listener: Function) => listener());
   
        onDestroy && onDestroy.call(this);
      };
    }
  }
}
