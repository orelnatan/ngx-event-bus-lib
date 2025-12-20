import { Renderer2 } from "@angular/core";

import { Args, IGEvent } from "../models";
import { GLOBAL_HOST } from "../consts";

export function initListeners<T extends Args>(events: IGEvent[], instance: InstanceType<T>, renderer2: Renderer2): Function[] {
  return events.map((event: IGEvent) => {
    return renderer2.listen(GLOBAL_HOST, event.type, data => {
      instance[event.action](data.detail);
    })
  })
}