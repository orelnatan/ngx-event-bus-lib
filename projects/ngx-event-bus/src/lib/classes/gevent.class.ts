import { Payload } from "../models";

export class GEvent {
  public type: string;
  public payload?: Payload;

  constructor(type: string, paylaod?: Payload) {
    this.type = type;
    this.payload = paylaod;
  }
}