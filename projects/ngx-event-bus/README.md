<!-- ![ngx-event-bus cover](https://i.ibb.co/rftSpnds/ngx-event-bus-lib-cover-by-oreate-light-V2-ORG.png) -->

<p align="center">
  <img src="https://i.ibb.co/rftSpnds/ngx-event-bus-lib-cover-by-oreate-light-V2-ORG.png" />
</p>

# ngx-event-bus

**A lightweight, fully-tested, type-safe global event bus for Angular — powered by decorators, pure functions, and zero shared state.**

Broadcast strongly-typed events anywhere in your app and react to them declaratively —
without services, DI, providers, RxJS, Signals, or tight coupling.

## Motivation

In many Angular applications, **components that are completely unrelated still need to communicate**.

When the app is not built around a state-management solution, a common approach is to introduce a shared service —
usually based on RxJS `Subject`'s or Signals — and use it as a communication bridge.

This typically requires:
- Services, providers, and dependency injections
- RxJS tools or Signals
- Manual lifecycle handling to avoid memory leaks (in the case of RxJS)

`ngx-event-bus` takes a different approach.

It is built on **native JavaScript events**, automatically manages subscriptions, and requires **no services, no DI, and no module setup or imports**.
Event handling is simple, declarative, and free from shared state.

## Compatibility 

> ✅ **Angular support:** Angular **v9 and above**

Supports **all Angular entities**:

- Components
- Directives
- Services
- Pipes

## Quick Start 🚀

## Install
```bash
npm install ngx-event-bus
# or
yarn add ngx-event-bus
```

## Usage

### Broadcasting an event 🛜​
```bash
import { broadcast, GEvent } from "ngx-event-bus";

publish(): void {
  broadcast(
    new GEvent("MY_EVENT", {
      metadata: "My event data..."
    })
  );
}
```

> The event's payload can be **any type of data** — primitives, objects, functions, and more. (If no payload is provided, the default is null)

---

### Intercepting an event 📡
```bash
import { Component } from "@angular/core";
import { Interceptor, intercept } from "ngx-event-bus";

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
> ⚠️ Mandatory: Always call intercept(this) in the constructor to activate the `@Interceptor`.

> The `@Interceptor` decorator can intercept and handle **any number of events**, without limits.

## 🎯 Targeted Events

By default, events are **broadcast globally** — each interceptor listening to the same event type will receive them.

However, in some scenarios you may want **only specific listeners** to react to an event, even if multiple interceptors are registered for the same type. To support this, events can be optionally sent with a **`key`** (`string`).

### Broadcasting a targeted event 🛜​

```bash
publish(): void {
  broadcast(
    new GEvent("MY_EVENT", {
      metadata: "My event data..."
    }, "BUS::MY_EVENT::A9F3-77XQ") // 🔑​
  );
}
```

### Intercepting a targeted event 📡

```bash
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
> Events broadcast with a mismatched key will be **rejected** by the `@Interceptor` ❌


## Advanced Usage ⚡

`ngx-event-bus` supports **fully-typed events** in 3 different levels, from quick-and-loose to fully enforced best practices.  

---

### 1️⃣ Loose / Quick Usage
```bash
broadcast(new GEvent("MY_EVENT", {
  metadata: "Quick, untyped payload"
}));
```
- ✅ Fast — minimal setup, just fire-and-forget.  
- ✅ Flexible — any shape of payload is allowed.  
- ❌ No type safety (developer choice)

### 2️⃣ Generic enforce - Strongly Typed 
```bash
broadcast(
  new GEvent<"MY_EVENT", { metadata: string }>("MY_EVENT", {
    metadata: "Payload and event name are generic enforced.
  })
);
```
Or even smarter, with Enums/types and interfaces

```bash
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
- ✅ Payload enforced — TypeScript ensures payload shape is correct.
- ✅ Event names centralized — reduces typos and keeps event names consistent.
- ✅ Better developer experience — IDE autocompletion works.
- ❌ Event–payload relationship not fully enforced — nothing prevents using the wrong payload with a given event type.

### 3️⃣ Fully Enforced, Best Practice 🥇
By extending the `GEvent` class, you can create your own fully enforced events. This ensures **both the event type and its payload are strictly typed**, making your code refactor-safe and perfect for large apps.

```bash
import { GEvent, broadcast } from 'ngx-event-bus';

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
- ✅ Fully typed — TypeScript strictly enforces both event type and payload, guaranteeing their correct relationship.
- ✅ Refactor-safe — renaming the event or payload interface will automatically propagate errors if used incorrectly.
- ✅ Best developer experience — IDE autocompletion, type-checking, and maintainability are maximized.
- ✅ Large-app ready — ideal for apps with many events and complex interactions.