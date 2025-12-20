import { GEvent } from '../classes';

export async function broadcast(event: GEvent): Promise<void> {
  window.dispatchEvent(new CustomEvent(event.type, { detail: event.payload }))
}