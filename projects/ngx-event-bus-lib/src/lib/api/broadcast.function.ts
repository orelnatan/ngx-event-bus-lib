import { GEvent } from "../classes";
import { PAYLOAD_PROTOTYPE } from "../consts";

/**
 * Sends a global, system-wide event via the Event Bus.
 *
 * The event will be received by all active `@Interceptor`s that are
 * listening for the same event type.
 *
 * Events may optionally include a `key`. When a key is provided,
 * only interceptors registered with the same key will accept the
 * event; all others will be rejected.
 *
 * The payload is strongly typed and may be any value:
 * primitives, objects, arrays, etc.
 *
 * Internally, the payload is wrapped in a trusted object to ensure
 * listeners only handle legitimate, system-generated events.
 * Interceptors always access the original payload via `event.detail.data`.
 *
 * @template T - Type of the event name (string literal recommended for type safety).
 * @template P - Type of the event payload.
 *
 * @param event - The typed event instance to broadcast.
*/
export function broadcast<T extends string, P = unknown>(
  event: GEvent<T, P>
): void {
  const trustedPayload = Object.create(PAYLOAD_PROTOTYPE);

  Object.assign(trustedPayload, { 
    data: event.payload || null,
    key: event.key
  });
  
  window.dispatchEvent(
    new CustomEvent(event.type, {
      detail: trustedPayload,
    })
  );
}
