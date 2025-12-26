import { GEvent } from '../classes';

export async function broadcast<T>(event: GEvent<T>): Promise<void> {
  window.dispatchEvent(new CustomEvent(event.type, { detail: event.payload }))
}