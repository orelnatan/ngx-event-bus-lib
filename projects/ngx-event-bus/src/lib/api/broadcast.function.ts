import { GEvent } from "../classes";
import { PAYLOAD_PROTOTYPE } from "../consts";

/**
 * Sends a global, system-wide event via the Event Bus.
 *
 * Each active @Interceptor that is listening for the same event type will receive this event.
 * The payload is strongly typed, allowing for safe and predictable event data handling.
 *
 * @template P - Type of the payload data.
 * @template T - Type of the event name (string literal recommended for type safety).
 *
 * @param event - The event object to broadcast. Must include a `type` and `payload`.
*/
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
