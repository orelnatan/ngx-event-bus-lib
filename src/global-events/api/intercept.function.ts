import { DECORATOR_APPLIED } from "../consts";
import { Args } from "../models";

export function intercept<T>(instance: T): void {
  return (function<U extends Args>(): void {
    const unDecorated: boolean = !(DECORATOR_APPLIED in (Object.getPrototypeOf(instance)));

    if(unDecorated) {
      throw new Error('intercept() function cannot be used inside any Angular classes ' +
                      'that are not decorated with @Interceptor decorator');
    }

    (instance as InstanceType<U>).constructor.prototype._constructor(instance);
  })()
}
