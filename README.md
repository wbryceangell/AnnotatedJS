<p align="center">
  <img src="https://github.com/Fork-Git-It/AnnotatedJS/assets/11467984/c11a3cb2-4fe9-4656-9c1c-24626352b4f0" width="120" alt="AnnotatedJS Logo" />
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

```typescript
// exampleConfig.ts
import { Config, Router } from "@fork-git-it/annotatedjs";
import { Router as IttyRouter } from "itty-router";

@Config()
export class ExampleConfig {
  @Property("IttyRouter")
  getIttyRouter() {
    return IttyRouter();
  }

  @Property("Storage")
  getStorage(): Map<string, string> {
    return new Map();
  }
}
```

```typescript
// exampleRouter.ts
import { AnnotatedRouter, Router } from "@fork-git-it/annotatedjs";
import { type RouterType } from "itty-router";

@Router()
class ExampleRouter implements AnnotatedRouter {
  @Inject("IttyRouter")
  private accessor ittyRouter: RouterType;

  get(uri: string, handler: RequestHandler): AnnotatedRouter {
    this.ittyRouter.get(uri, handler);
    return this;
  }

  handle(request: Request) {
    return this.ittyRouter.handle(request);
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
}
```

```typescript
// storageService.ts
import { Inject, Service } from "@fork-git-it/annotatedjs";

@Service()
export class StorageService {
  @Inject("Storage")
  private accessor storage: Map<string, string>;

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
// nodeCache.ts
import { AnnotatedCache } from "@fork-git-it/annotatedjs";

export class NodeCache implements AnnotatedCache {
  private map = new Map<string, Response>();

  async match(request: Request): Promise<Response | undefined> {
    let response = this.map.get(request.url);

    if (response) {
      response = new Response(response.body, {
        headers: { [cacheHeader]: "true" },
      });
    }

    return response;
  }

  async put(request: Request, response: Response): Promise<undefined> {
    this.map.set(request.url, response);
  }

  async delete(request: Request): Promise<boolean> {
    return this.map.delete(request.url);
  }
}
```

```typescript
// nodeCacheStorage.ts
import { AnnotatedCacheStorage, CacheStorage } from "@fork-git-it/annotatedjs";
import { NodeCache } from "./nodeCache";

@CacheStorage()
class NodeCacheStorage implements AnnotatedCacheStorage {
  private map = new Map<string, AnnotatedCache>();

  has(cacheName: string): Promise<boolean> {
    return this.map.has(cacheName);
  }

  async open(cacheName: string): Promise<AnnotatedCache> {
    if (this.map.has(cacheName)) {
      return this.map.get(cacheName) as AnnotatedCache;
    }

    const cache = new NodeCache();
    this.map.set(cacheName, cache);
    return cache;
  }

  async delete(cacheName: string): Promise<boolean> {
    return this.map.delete(cacheName);
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
import { createServerAdapter } from "@whatwg-node/server";
import { createServer } from "http";
import "isomorphic-fetch";

import "./exampleConfig.ts";
import "./exampleRouter.ts";
import "./storageService.ts";
import "./storageController.ts";

const handleRequest = initialize();
const ittyServer = createServerAdapter(handleRequest);
const httpServer = createServer(ittyServer);
httpServer.listen(3001);
console.log("listening at https://localhost:3001");
```

## Containers

AnnotatedJS utilizes a container object to store globally configured values. The framework sets up a container by default but the `initialize` function and class-level annotations also accept a container object as an argument. This means that multiple containers can be configured if necessary. The container TypeScript type is `Record<string, unknown>`.

## Attributions

Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect"> Pixel perfect </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>

## License

AnnotatedJS is [MIT licensed](LICENSE).
