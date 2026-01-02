import { GEvent } from "../classes";
import { PAYLOAD_PROTOTYPE } from "../consts";

export function broadcast<P, T extends string>(
  event: GEvent<P, T>
): void {
  const trustedPayload = Object.create(PAYLOAD_PROTOTYPE);

  Object.assign(trustedPayload, event.payload);
  window.dispatchEvent(
    new CustomEvent(event.type, {
      detail: trustedPayload,
    })
  );
}
