import { NgModule, Renderer2, RendererFactory2 } from '@angular/core';

@NgModule()
export class GlobalEventsModule {
  static renderer2: Renderer2;

  constructor(
    private readonly rendererFactory: RendererFactory2
  ) { 
    GlobalEventsModule.renderer2 = this.rendererFactory.createRenderer(null, null);
  }
}