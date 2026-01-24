/**
 * Represents a strongly-typed event in the Event Bus system.
 *
 * Each `GEvent` has a `type` (string literal recommended for type safety) and a `payload`.
 * This object is used with the Event Bus functions, ensuring
 * type-safe communication across your Angular application.
 *
 * @template T - Type of the event name. Defaults to `string`, but string literals are recommended.
 * @template P - Type of the event payload. Defaults to `null` if no payload is needed.
*/
export class GEvent<T extends string, P = unknown> {
  /** The type of the event */
  readonly type: T;

  /** The strongly-typed payload of the event */
  readonly payload?: P;

  /** Optional key used to scope or target the event */
  readonly key?: string;

 /**
   * Creates a new typed event instance.
   *
   * @param type - The event type identifier.
   * @param payload - Optional event payload.
   * @param key - Optional key used to target specific interceptors.
  */
  constructor(type: T, payload?: P, key?: string) {
    this.type = type;
    this.payload = payload;
    this.key = key;
  }
}
