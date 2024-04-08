<p align="center">
  <img src="logo.svg" height="150" alt="AnnotatedJS logo">
</p>
<p align="center">A JavaScript framework for building backends with annotations.</p>
<p align="center">
<a href="https://github.com/Fork-Git-It/AnnotatedJS/pkgs/npm/annotatedjs" target="_blank"><img src="https://img.shields.io/github/package-json/v/Fork-Git-It/AnnotatedJS/main" alt="Package Version" /></a>
<a href="https://github.com/Fork-Git-It/AnnotatedJS/actions/workflows/ci.yml" target="_blank"><img src="https://github.com/Fork-Git-It/AnnotatedJS/actions/workflows/ci.yml/badge.svg" alt="Continuous Integration" /></a>
<a href="https://paypal.me/wbryceangell?country.x=US&locale.x=en_US" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-0079c1.svg"/></a>
</p>

## Description

AnnotatedJS is a lightweight framework for building JavaScript backends. It is built with <a href="https://www.typescriptlang.org" target="_blank">TypeScript</a> and favors configuration over convention. This design allows it the flexibility to operate in different runtimes such as <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API" target="_blank">Web Workers</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API" target="_blank">Service Workers</a>, and <a href="https://nodejs.org" target="_blank">Node.js</a>.

The framework is heavily inspired by <a href="https://spring.io/" target="_blank">Spring</a> and <a href="https://nestjs.com/" target="_blank">NestJS</a>.

## Documentation

Full documentation can be found on the [GitHub page](https://fork-git-it.github.io/AnnotatedJS/)

## Decorators

This framework relies on the <a href="https://github.com/tc39/proposal-decorators" target="_blank">decorators</a> experimental JavaScript feature. It is recommended to use [Babel](https://babeljs.io/docs/babel-plugin-proposal-decorators) to compile codebases that include AnnotatedJS.

## Installation

Create a [GitHub Personal Access Token](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry) and use it to login to npm via:

```bash
npm login --scope=@fork-git-it --registry=https://npm.pkg.github.com
```

Then proceed to install the npm package via:

```bash
npm install @fork-git-it/annotatedjs
```

## Example

A trivial example of a local storage API in a service worker

```typescript
// workerConfig.ts
import { Config } from "@fork-git-it/annotatedjs";
import { Router as IttyRouter } from "itty-router";

@Config()
export class WorkerConfig {
  @Property("IttyRouter")
  getIttyRouter() {
    return IttyRouter();
  }
}
```

```typescript
// localDatastore.ts
import { AnnotatedDatastore, Datastore } from "@fork-git-it/annotatedjs";

@Datastore()
class LocalDatastore implements AnnotatedDatastore<string> {
  length: number;

  async clear(): Promise<undefined> {
    localStorage.clear();
    this.length = localStorage.length;
  }

  async getItem(keyName: string): Promise<string | null> {
    return localStorage.getItem(keyName);
  }

  async key(index: number): Promise<string | null> {
    return localStorage.key(index);
  }

  async removeItem(keyName: string): Promise<undefined> {
    localStorage.removeItem(keyName);
    this.length = localStorage.length;
  }

  async setItem(keyName: string, value: string): Promise<undefined> {
    localStorage.setItem(keyName, value);
    this.length = localStorage.length;
  }
}
```

```typescript
// workerRouter.ts
import { AnnotatedRouter, Router } from "@fork-git-it/annotatedjs";
import { type RouterType } from "itty-router";

@Router()
class WorkerRouter implements AnnotatedRouter {
  @Inject("IttyRouter")
  private accessor ittyRouter: RouterType;

  options(uri: string, handler: RequestHandler): AnnotatedRouter {
    this.ittyRouter.options(uri, handler);
    return this;
  }

  head(uri: string, handler: RequestHandler): AnnotatedRouter {
    this.ittyRouter.head(uri, handler);
    return this;
  }

  get(uri: string, handler: RequestHandler): AnnotatedRouter {
    this.ittyRouter.get(uri, handler);
    return this;
  }

  put(uri: string, handler: RequestHandler): AnnotatedRouter {
    this.ittyRouter.put(uri, handler);
    return this;
  }

  post(uri: string, handler: RequestHandler): AnnotatedRouter {
    this.ittyRouter.post(uri, handler);
    return this;
  }

  patch(uri: string, handler: RequestHandler): AnnotatedRouter {
    this.ittyRouter.patch(uri, handler);
    return this;
  }

  delete(uri: string, handler: RequestHandler): AnnotatedRouter {
    this.ittyRouter.delete(uri, handler);
    return this;
  }

  all(uri: string, handler: RequestHandler): AnnotatedRouter {
    this.ittyRouter.all(uri, handler);
    return this;
  }

  handle(request: Request) {
    return this.ittyRouter.handle(request);
  }
}
```

```typescript
// storageService.ts
import { AnnotatedDatastore, Inject, Service } from "@fork-git-it/annotatedjs";
import { LocalDatastore } from "./localDatastore";

@Service()
export class StorageService {
  @Inject(LocalDatastore)
  private accessor datastore: AnnotatedDatastore<string>;

  async create(key: string, value: any) {
    await this.datastore.setItem(key, JSON.stringify(value));
  }

  async read(key: string) {
    const value = await this.datastore.getItem(key);
    if (!value) throw new Error(`no value for ${key} in storage`);
    return JSON.parse(value);
  }

  async update(key: string, value: any) {
    await this.datastore.setItem(key, JSON.stringify(value));
  }

  async delete(key: string) {
    await this.datastore.removeItem(key);
  }
}
```

```typescript
// workerCacheStorage.ts
import { AnnotatedCacheStorage, CacheStorage } from "@fork-git-it/annotatedjs";

@CacheStorage()
class WorkerCacheStorage implements AnnotatedCacheStorage {
  has(cacheName: string): Promise<boolean> {
    return caches.has(cacheName);
  }

  async open(cacheName: string): Promise<AnnotatedCache> {
    return caches.open(cacheName);
  }

  async delete(cacheName: string): Promise<boolean> {
    return caches.delete(cacheName);
  }
}
```

```typescript
// storageController.ts
import {
  Cache,
  Controller,
  Get,
  Purge,
  Put,
  Delete,
} from "@fork-git-it/annotatedjs";
import { StorageService } from "./storageService";

@Controller("/storage")
export class StorageController {
  @Inject(StorageService)
  private accessor storageService: StorageService;

  @Cache("storageCache")
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

  @Purge("storageCache")
  @Put("/:key")
  async put(req: Request): Promise<Response> {
    const ittyRequest: IRequest = <IRequest>req;
    const value = await req.json();
    this.storageService.update(ittyRequest.params.key, value);
    return new Response(null, { status: 204 });
  }

  @Purge("storageCache")
  @Delete("/:key")
  async delete(req: Request): Promise<Response> {
    const ittyRequest: IRequest = <IRequest>req;
    this.storageService.delete(ittyRequest.params.key);
    return new Response(null, { status: 204 });
  }
}
```

```typescript
// index.ts

import { initialize } from "@fork-git-it/annotatedjs";
import "./workerConfig";
import "./localDatastore";
import "./storageController";

const requestHandler = initialize();
const eventHandler = (evt: Event) => {
  evt.respondWith(requestHandler(evt.request));
};
addEventListener("fetch", eventHandler);
```

## Containers

AnnotatedJS utilizes a container object to store globally configured values. The framework sets up a container by default but the `initialize` function and class-level annotations also accept a container object as an argument. This means that multiple containers can be configured if necessary. The container TypeScript type is `Record<string, unknown>`.

## License

AnnotatedJS is [MIT licensed](LICENSE).
