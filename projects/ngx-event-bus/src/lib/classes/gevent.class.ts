
export class GEvent<P = void, T extends string = string> {
  readonly type: T;
  readonly payload: P;

  constructor(type: T, payload: P) {
    this.type = type;
    this.payload = payload;
  }
}
