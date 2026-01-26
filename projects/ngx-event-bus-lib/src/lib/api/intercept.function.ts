import { DECORATOR_APPLIED } from "../consts";
import { Args } from "../models";
import { isRuntimeDomEventSupport } from "../utils";

/**
 * Registers an instance to receive events through its @Interceptor-decorated methods.
 *
 * This function must be called inside the class constructor with `this` as the argument:
 * ```ts
 * constructor() {
 *   intercept(this);
 * }
 * ```
 *
 * Only classes decorated with `@Interceptor` can be intercepted. Calling this on an
 * undecorated class will throw an error.
 *
 * After calling this, methods specified in the `@Interceptor` decorator will receive
 * events of the corresponding type via the Event Bus.
 *
 * @template T - Type of the instance being intercepted.
 *
 * @param instance - The class instance to register for interception.
*/
export function intercept<T>(instance: T): void {
  return (function<U extends Args>(): void {
    if(!isRuntimeDomEventSupport()) return;
    
    const unDecorated: boolean = !(DECORATOR_APPLIED in (Object.getPrototypeOf(instance)));
    if(unDecorated) {
      throw new Error('intercept() function cannot be used inside any Angular classes ' +
                      'that are not decorated with @Interceptor decorator');
    }

    (instance as InstanceType<U>).constructor.prototype._intercept(instance);
  })()
}
