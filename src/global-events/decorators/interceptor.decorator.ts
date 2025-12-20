import { ɵPipeDef } from "@angular/core";

import { GlobalEventsModule } from "../global-events.module";
import { IGEvent, Args } from "../models";
import { initListeners, isPipe } from "../utils";
import { DECORATOR_APPLIED } from "../consts";

export function Interceptor<T extends Args>(events: IGEvent[] = []): (orgConstructor: T) => void {
  return function(orgConstructor: T): void {
    let listeners: Function[] = [];
  
    orgConstructor.prototype[DECORATOR_APPLIED] = true;
    orgConstructor.prototype._constructor = function(instance: InstanceType<T>): void {
      listeners = initListeners(
        events, instance, GlobalEventsModule.renderer2);
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
