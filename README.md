<p align="center">
  <img src="https://github.com/Fork-Git-It/AnnotatedJS/assets/11467984/c11a3cb2-4fe9-4656-9c1c-24626352b4f0" width="120" alt="AnnotatedJS Logo" />
</p>
<p align="center">A JavaScript framework for building backends with annotations.</p>
<p align="center"><a href="https://paypal.me/wbryceangell?country.x=US&locale.x=en_US" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-0079c1.svg"/></a></p>

## Description

AnnotatedJS is a lightweight framework for building JavaScript backends. It is built with <a href="https://www.typescriptlang.org" target="_blank">TypeScript</a> and favors configuration over convention. This design allows it the flexibility to operate in different runtimes such as <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API" target="_blank">Web Workers</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API" target="_blank">Service Workers</a>, and <a href="https://nodejs.org" target="_blank">Node.js</a>.

The framework is heavily inspired by <a href="https://spring.io/" target="_blank">Spring</a> and <a href="https://nestjs.com/" target="_blank">NestJS</a>.

## Decorators

This framework relies on the <a href="https://github.com/tc39/proposal-decorators" target="_blank">decorators</a> experimental JavaScript feature. Here are a some guides to start using it in:

- [JavaScript](https://babeljs.io/docs/babel-plugin-proposal-decorators)
  - Use "legacy" version of the decorator proposal
- [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

## Annotations

### [@Config](#config-1)

### [@Controller](#controller-1)

### [@Service](#service-1)

### [@Inject](#inject-1)

## @Config

```typescript
import { Config, Router } from "@fork-git-it/annotatedjs";

@Config
export class ExampleConfig {
  getRouter(): Router {
    // return Router implementation
  }

  @Property(Symbol.for("Injected"))
  getInjected(): any {
    // return some value to be injected
  }
}
```

`@Config` defines values that will be available for injection. It requires the `getRouter()` method at minimum.

`@Config` encapsulates `@Property` annotations. `@Property` takes a symbol as an argument and injects the returned value of the method using that symbol, see [@Inject](#inject-1).

## @Controller

```typescript
import {
  Controller,
  Get,
  Put,
  Post,
  Patch,
  Delete,
} from "@fork-git-it/annotatedjs";

@Controller("/items")
export class ExampleController {
  @Get()
  async getItems(req: Request): Promise<Response> {}

  @Get("/:id")
  async getItem(req: Request): Promise<Response> {}

  @Put("/:id")
  async putItem(req: Request): Promise<Response> {}

  @Post("/:id")
  async postItem(req: Request): Promise<Response> {}

  @Patch("/:id")
  async patchItem(req: Request): Promise<Response> {}

  @Delete("/:id")
  async deleteItem(req: Request): Promise<Response> {}
}
```

`@Controller` represents a specific API entrypoint. It expects the API path as a parameter.

The HTTP method annotations `@Get`, `@Put`, `@Post`, `@Patch`, `@Delete` take the API endpoint path as an optional paramater.

## @Service

```typescript
import { Service } from "@fork-git-it/annotatedjs";

@Service
export class ExampleService {
  doSomething() {}
}
```

`@Service` will specify the class as one that can be injeted. The class is used as the lookup when injecting the service, see [@Inject](#inject-1).

## @Inject

`@Inject` is the annotation that allows for injection across classes. Here is a full example:

```typescript
import { Config, Router } from "@fork-git-it/annotatedjs";
import { Router as IttyRouter } from "itty-router";

@Config
export class ExampleConfig {
  getRouter(): Router {
    return IttyRouter();
  }

  @Property(Symbol.for("Storage"))
  getStorage(): Map<string, string> {
    return new Map();
  }
}
```

```typescript
// storageService.ts
import { Inject, Service } from "@fork-git-it/annotatedjs";

@Service
export class StorageService {
  @Inject(Symbol.for("Storage"))
  private storage!: Map<string, string>;

  create(key: string, value: any) {
    this.storage.set(key, JSON.stringify(value));
  }

  read(key: string) {
    const value = this.storage.get(key);
    if (!value) throw new Error(`no value for ${key} in storage`);
    return JSON.parse(value);
  }

  update(key: string, value: any) {
    this.storage.set(key, JSON.stringify(value));
  }

  delete(key: string) {
    this.storage.delete(key);
  }
}
```

```typescript
import { Controller, Get, Put, Delete } from "@fork-git-it/annotatedjs";
import { StorageService } from "./storageService";

@Controller("/storage")
export class StorageController {
  @Inject(StorageService)
  private storageService!: StorageService;

  @Get("/:key")
  async get(req: Request): Promise<Response> {
    const ittyRequest: IRequest = <IRequest>req;
    try {
      const value = this.storageService.read(ittyRequest.params.key);
      return new Response(JSON.stringify(value));
    } catch (e) {
      return new Response(JSON.stringify(e), { status: 400 });
    }
  }

  @Put("/:key")
  async put(req: Request): Promise<Response> {
    const ittyRequest: IRequest = <IRequest>req;
    const value = await req.json();
    this.storageService.update(ittyRequest.params.key, value);
    return new Response(null, { status: 204 });
  }

  @Delete("/:key")
  async delete(req: Request): Promise<Response> {
    const ittyRequest: IRequest = <IRequest>req;
    this.storageService.delete(ittyRequest.params.key);
    return new Response(null, { status: 204 });
  }
}
```

`@Inject` accepts two different types of arguments: a symbol or a class. The `StorageService` class above uses a Symbol to get the `Storage` instance. The `StorageController` class uses the `StorageService` class as the injection argument.

## Attributions

Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect"> Pixel perfect </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>

## License

AnnotatedJS is [MIT licensed](LICENSE).
