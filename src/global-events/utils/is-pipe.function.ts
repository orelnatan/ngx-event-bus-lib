import { IPipeType } from "../models";
import { NG_PIPE_DEF } from "../consts";

export function isPipe<T>(target: T): target is T {
  return !!(target as unknown as IPipeType<T>)[NG_PIPE_DEF];
}
