import { Renderer2 } from "@angular/core";

import { Args, Event } from "../models";
import { GLOBAL_HOST, PAYLOAD_PROTOTYPE } from "../consts";

export function initListeners<T extends Args>(events: Event[], instance: InstanceType<T>, renderer2: Renderer2): Function[] {
  return events.map((event: Event) => {
    return renderer2.listen(GLOBAL_HOST, event.type, data => {
      if (Object.getPrototypeOf(data.detail) !== PAYLOAD_PROTOTYPE) return;
 
      if (typeof instance[event.action] !== 'function') {
        throw new Error(
          `Interceptor error: "${event.action}" is not a function on ${instance.constructor.name}`
        );
      }

      instance[event.action](data.detail);
    })
  })
}