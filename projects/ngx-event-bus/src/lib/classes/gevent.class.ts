/**
 * Represents a strongly-typed event in the Event Bus system.
 *
 * Each `GEvent` has a `type` (string literal recommended for type safety) and a `payload`.
 * This object is used with the Event Bus functions, ensuring
 * type-safe communication across your Angular application.
 *
 * @template T - Type of the event name. Defaults to `string`, but string literals are recommended.
 * @template P - Type of the event payload. Defaults to `void` if no payload is needed.
*/
export class GEvent<T extends string = string, P = void> {
  /** The type of the event */
  readonly type: T;

  /** The strongly-typed payload of the event */
  readonly payload?: P;

  /**
   * Creates a new typed event instance.
   *
   * @param type - The event type string.
   * @param payload - The event payload.
  */
  constructor(type: T, payload?: P) {
    this.type = type;
    this.payload = payload;
  }
}
