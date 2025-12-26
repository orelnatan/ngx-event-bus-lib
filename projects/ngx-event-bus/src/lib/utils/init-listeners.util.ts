import { Renderer2 } from "@angular/core";

import { Args, Event } from "../models";
import { GLOBAL_HOST } from "../consts";

export function initListeners<T extends Args>(events: Event[], instance: InstanceType<T>, renderer2: Renderer2): Function[] {
  return events.map((event: Event) => {
    return renderer2.listen(GLOBAL_HOST, event.type, data => {
      instance[event.action](data.detail);
    })
  })
}