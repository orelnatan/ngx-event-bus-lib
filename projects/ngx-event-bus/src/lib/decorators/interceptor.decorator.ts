import { Renderer2, RendererFactory2, ɵPipeDef, ɵɵdirectiveInject } from "@angular/core";

import { initListeners, isPipe } from "../utils";
import { DECORATOR_APPLIED } from "../consts";
import { Event, Args } from "../models";

/**
 * Class decorator that registers methods to handle cross-system events.
 *
 * Use this decorator on an Angular class to specify which events it should listen to.
 * Each object in the `events` array defines an event type and the corresponding class
 * method (action) that should be called when that event is broadcast.
 *
 * After decorating the class, you must call `intercept(this)` in the constructor to
 * activate interception, otherwise the methods will not receive any events.
 *
 * @template T - Type of the class constructor being decorated.
 *
 * @param events - An array of event descriptors. Each descriptor must include:
 *   - `type`: the event type string (strongly typed recommended)
 *   - `action`: the name of the class method to execute when the event occurs
 * @returns A class constructor function with interception logic applied.
*/
export function Interceptor<T extends Args>(events: Event[] = []): (orgConstructor: T) => void {  
  return function(orgConstructor: T): void {
    let listeners: Function[] = [];
  
    orgConstructor.prototype[DECORATOR_APPLIED] = true;
    orgConstructor.prototype._constructor = function(instance: InstanceType<T>): void {
      const rendererFactory: RendererFactory2 = ɵɵdirectiveInject(RendererFactory2);
      const renderer2: Renderer2 = rendererFactory.createRenderer(null, null);

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
