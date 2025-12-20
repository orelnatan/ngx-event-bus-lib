import { Type, ɵPipeDef } from '@angular/core';

export interface PipeType<T> extends Type<T> {
  ɵpipe: ɵPipeDef<T>;
}