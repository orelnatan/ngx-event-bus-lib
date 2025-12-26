import { GEvent, broadcast } from 'ngx-event-bus';
import { GEventTypes, LocaleEvent, ThemeEvent } from "../interfaces";

export class Logout extends GEvent {
  static readonly TYPE = GEventTypes.Logout;

  constructor() {
    super(Logout.TYPE);
  }
}

export class Theme extends GEvent<ThemeEvent> {
  static readonly TYPE = GEventTypes.Theme;

  constructor(payload: ThemeEvent) {
    super(Theme.TYPE, payload);
  }
}

export class Locale extends GEvent<LocaleEvent> {
  static readonly TYPE = GEventTypes.Locale;

  constructor(payload: LocaleEvent) {
    super(Locale.TYPE, payload);
  }
}

