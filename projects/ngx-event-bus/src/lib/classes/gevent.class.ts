
export class GEvent<T> {
  public type: string;
  public payload?: T;

  constructor(type: string, paylaod?: T) {
    this.type = type;
    this.payload = paylaod;
  }
}