import { GEvent } from "../classes";

export function broadcast<P, T extends string>(
  event: GEvent<P, T>
): void {
  window.dispatchEvent(
    new CustomEvent<P>(event.type, {
      detail: event.payload,
    })
  );
}