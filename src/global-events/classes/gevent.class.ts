import { Data } from "../models";

export class GEvent {
  public type: string;
  public payload?: Data;
  public delay?: number

  constructor(type: string, paylaod?: Data, delay?: number) {
    this.type = type;
    this.payload = paylaod;
    this.delay = delay;
  }
}