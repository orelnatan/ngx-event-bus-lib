import { Renderer2 } from "@angular/core";

import { Args, Event } from "../models";
import { GLOBAL_HOST, PAYLOAD_PROTOTYPE } from "../consts";

export function initListeners<T extends Args>(events: Event[], instance: InstanceType<T>, renderer2: Renderer2): Function[] {
  return events.map((event: Event) => {
    return renderer2.listen(GLOBAL_HOST, event.type, data => {
      // Guard 1:
      // Event Source - events originated from unknown or external sources will be rejected ❌
      if (Object.getPrototypeOf(data.detail) !== PAYLOAD_PROTOTYPE) {
        return;
      }

      // Guard 2:
      // Key-based event filtering - events broadcast with a mismatched key will be rejected ❌
      if (event.key !== data.detail.key) {
        return;
      }
      
      // Guard 3:
      // Interceptor integrity check — ensure the configured action exists and callable, misconfiguration is treated as a hard error ❌
      if (typeof instance[event.action] !== 'function') {
        throw new Error(
          `Interceptor error: "${event.action}" is not a function on ${instance.constructor.name}`
        );
      }
      
      // Event accepted ✅
      // At this point, the event is verified, trusted, and correctly targeted.
      instance[event.action](data.detail.data);
    })
  })
}