import { GEvent, broadcast } from 'ngx-event-bus';
//import { GEvent, broadcast } from '../../../projects/ngx-event-bus/src/public-api';

import { GEventTypes, LocaleEvent, ThemeEvent } from "../interfaces";

export class Logout extends GEvent<GEventTypes.Logout> {
  static readonly TYPE = GEventTypes.Logout;

  constructor() {
    super(Logout.TYPE);
  }
}

export class Theme extends GEvent<GEventTypes.Theme, ThemeEvent> {
  static readonly TYPE = GEventTypes.Theme;

  constructor(payload: ThemeEvent, key?: string) {
    super(Theme.TYPE, payload, key);
  }
}

export class Locale extends GEvent<GEventTypes.Locale, LocaleEvent> {
  static readonly TYPE = GEventTypes.Locale;

  constructor(payload: LocaleEvent) {
    super(Locale.TYPE, payload);
  }
}