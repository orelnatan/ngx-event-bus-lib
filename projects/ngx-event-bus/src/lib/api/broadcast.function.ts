import { GEvent } from "../classes";
import { PAYLOAD_PROTOTYPE } from "../consts";

/**
 * Sends a global, system-wide event via the Event Bus.
 *
 * The event will be received by all active `@Interceptor`s that are
 * listening for the same event type. The payload is strongly typed,
 * but can be **any value**: primitives, objects, arrays, etc.
 *
 * Internally, the payload is wrapped in a "trusted payload" object
 * to ensure listeners only handle legitimate, system-generated events.
 * Listeners will always access the original payload via `data.detail.data`.
 *
 * @template T - Type of the event name (string literal recommended for type safety).
 * @template P - Type of the payload data.
 *
 * @param event - The event object to broadcast. Must include a `type` and `payload`.
*/
export function broadcast<T extends string, P = null>(
  event: GEvent<T, P>
): void {
  const trustedPayload = Object.create(PAYLOAD_PROTOTYPE);

  Object.assign(trustedPayload, { data: event.payload || null });
  window.dispatchEvent(
    new CustomEvent(event.type, {
      detail: trustedPayload,
    })
  );
}
