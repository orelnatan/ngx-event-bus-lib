/**
 * Describes an Event Bus mapping for a class method.
 *
 * Used in the `@Interceptor` decorator to specify which class method should
 * respond to a particular event type.
 *
 * @property type - The event type string that this method should listen to.
 * @property action - The name of the class method to execute when the event is intercepted.
 * @property key - Optional event key used to scope or target events.
*/
export interface Event {
  /** The event type string */
  type: string;

  /** The class method name that handles the event */
  action: string;

  /** Optional key used to filter events */
  key?: string;
}
