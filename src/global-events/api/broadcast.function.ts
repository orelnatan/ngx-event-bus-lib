import { GEvent } from '../classes';
import { wait } from '../utils';

export async function broadcast(event: GEvent): Promise<void> {
  await wait(event.delay!);

  window.dispatchEvent(new CustomEvent(event.type, { detail: event.payload }))
}