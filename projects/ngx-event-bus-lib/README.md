<p align="center">
  <picture>
    <img
      alt="Ngx Event Bus"
      src="https://github.com/orelnatan/ngx-event-bus-lib/blob/master/projects/ngx-event-bus-lib/ngx-event-bus-lib-cover.jpg"
      width="100%"
    />
  </picture>
</p>

# ngx-event-bus

[![CircleCI](https://circleci.com/gh/orelnatan/ngx-event-bus-lib/tree/master.svg?style=svg)](https://app.circleci.com/pipelines/github/orelnatan/ngx-event-bus-lib)
[![NPM Version](https://img.shields.io/npm/v/on-ngx-event-bus?color=green)](https://www.npmjs.com/package/on-ngx-event-bus)
[![License](https://img.shields.io/npm/l/on-ngx-event-bus)](https://github.com/orelnatan/ngx-event-bus-lib/blob/master/LICENSE)
[![Angular](https://img.shields.io/badge/Angular-21+-green)](https://angular.dev)
[![Downloads](https://img.shields.io/npm/dm/on-ngx-event-bus?color=green)](https://www.npmjs.com/package/on-ngx-event-bus)

**A lightweight, fully-tested, type-safe global event bus for Angular — powered by decorators, pure functions, and zero shared state.**

Broadcast strongly-typed events anywhere in your app and react to them declaratively —
without services, DI, providers, RxJS, Signals, or tight coupling.

<small><i>
 ⚠️&ensp;The <code>on-</code> prefix is used solely to avoid a naming conflict on npm and has no functional meaning.
</i></small>

## Motivation

In many Angular applications, **components that are completely unrelated still need to communicate**.

When the app is not built around a state-management solution, a common approach is to introduce a shared service —
usually based on RxJS `Subject`'s or Signals — and use it as a communication bridge.

This typically requires:
- Services, providers, and dependency injections
- RxJS tools or Signals
- Manual lifecycle handling to avoid memory leaks (in the case of RxJS)

`ngx-event-bus` takes a different approach.

It is built on **native JavaScript events**, automatically adds and removes event listeners to prevent **memory leaks**, and requires **no services, no DI, and no module setup or imports**. Event handling is simple, declarative, and free from shared state.

## Compatibility 

✅&ensp;**Angular support:** Angular **v9 and above**

Supports **all Angular entities**:

- Components
- Directives
- Services
- Pipes

## Quick Start&ensp;🚀

## Install
```bash
# npm
npm install on-ngx-event-bus

# yarn
yarn add on-ngx-event-bus

# pnpm
pnpm add on-ngx-event-bus
```

## Usage

### Broadcasting an event&ensp;🛜​
```ts
import { broadcast, GEvent } from "on-ngx-event-bus";

publish(): void {
  broadcast(
    new GEvent("MY_EVENT", {
      metadata: "My event data..."
    })
  );
}
```

- The event's payload can be **any type of data** — primitives, objects, functions, and more. (If no payload is provided, the default is null)

---

### Intercepting an event&ensp;📡
```ts
import { Component } from "@angular/core";
import { Interceptor, intercept } from "on-ngx-event-bus";

@Interceptor([
  { type: "MY_EVENT", action: "handleEvent" }
])
@Component({
  selector: "app-home",
  template: `Home`
})
export class HomeComponent {
  constructor() {
    intercept(this);
  }

  handleEvent(payload: { metadata: string }): void {
    console.log("Event intercepted: ", payload);
  }
}
```
- ⚠️&ensp;Mandatory: Always call `intercept(this)` in the constructor to activate the `@Interceptor`.

- The `@Interceptor` decorator can intercept and handle **any number of events**, without limits.

## 🎯&ensp;Targeted Events

By default, events are **broadcast globally** — each interceptor listening to the same event type will receive them.

However, in some scenarios you may want **only specific listeners** to react to an event, even if multiple interceptors are registered for the same type. To support this, events can be optionally sent with a **`key`** (`string`).

### Broadcasting a targeted event&ensp;🛜​

```ts
publish(): void {
  broadcast(
    new GEvent("MY_EVENT", {
      metadata: "My event data..."
    }, "BUS::MY_EVENT::A9F3-77XQ") // 🔑​
  );
}
```

### Intercepting a targeted event&ensp;📡

```ts
@Interceptor([
  { type: "MY_EVENT", action: "handleTargetedEvent", key: "BUS::MY_EVENT::A9F3-77XQ" }
])
@Component({
  selector: "app-home",
  template: `Home`
})
export class HomeComponent {
  constructor() {
    intercept(this);
  }

  handleTargetedEvent(): void {
    console.log("Will be triggered only if the key matches...");
  }
}
```
- Events broadcast with a mismatched key will be **rejected** by the `@Interceptor`&ensp;❌


## Advanced Usage&ensp;⚡

`ngx-event-bus` supports **fully-typed events** in 3 different levels, from quick-and-loose to fully enforced best practices.  

---

### 1️⃣&ensp;Loose / Quick Usage
```ts
broadcast(new GEvent("MY_EVENT", {
  metadata: "Quick, untyped payload"
}));
```
- ✅&ensp;Fast — minimal setup, just fire-and-forget.  
- ✅&ensp;Flexible — any shape of payload is allowed.  
- ❌&ensp;No type safety (developer choice)

### 2️⃣&ensp;Generic enforce - Strongly Typed 
```ts
broadcast(
  new GEvent<"MY_EVENT", { metadata: string }>("MY_EVENT", {
    metadata: "Payload and event name are generic enforced.
  })
);
```
Or even smarter, with Enums/types and interfaces

```ts
enum MyEventTypes {
  MyEvent = "MY_EVENT"
}

interface MyEventPayload {
  metadata: string;
}

broadcast(
 new GEvent<MyEventTypes.MyEvent, MyEventPayload>(
   MyEventTypes.MyEvent, {
     metadata: "Payload and event name are generic enforced.
   })
);
```
- ✅&ensp;Payload enforced — TypeScript ensures payload shape is correct.
- ✅&ensp;Event names centralized — reduces typos and keeps event names consistent.
- ✅&ensp;Better developer experience — IDE autocompletion works.
- ❌&ensp;Event–payload relationship not fully enforced — nothing prevents using the wrong payload with a given event type.

### 3️⃣&ensp;Fully Enforced, Best Practice&ensp;🥇
By extending the `GEvent` class, you can create your own fully enforced events. This ensures **both the event type and its payload are strictly typed**, making your code refactor-safe and perfect for large apps.

```ts
import { GEvent, broadcast } from 'on-ngx-event-bus';

export class MyEvent extends GEvent<MyEventTypes.MyEvent, MyEventPayload> {
  static readonly TYPE = MyEventTypes.MyEvent;

  constructor(payload: MyEventPayload) {
    super(MyEvent.TYPE, payload);
  }
}

broadcast(
  new MyEvent({
    metadata: "Fully typed and refactor-safe!"
  })
);
```
- ✅&ensp;Fully typed — TypeScript strictly enforces both event type and payload, guaranteeing their correct relationship.
- ✅&ensp;Refactor-safe — renaming the event or payload interface will automatically propagate errors if used incorrectly.
- ✅&ensp;Best developer experience — IDE autocompletion, type-checking, and maintainability are maximized.
- ✅&ensp;Large-app ready — ideal for apps with many events and complex interactions.

---

## Final Thoughts&ensp;✨

`ngx-event-bus` is designed to scale with your application — from small components to large, event-rich Angular systems.

It removes boilerplate, enforces correctness at compile time, and lets you focus on **intent**, not wiring.
If your app relies on clean, decoupled communication, this library is built for you.
