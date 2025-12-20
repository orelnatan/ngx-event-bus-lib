import { Type, ɵPipeDef } from '@angular/core';

export interface IPipeType<T> extends Type<T> {
  ɵpipe: ɵPipeDef<T>;
}