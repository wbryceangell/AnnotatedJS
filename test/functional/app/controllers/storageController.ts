import { Controller, Get, Inject } from "@src";
import { IRequest } from "itty-router";
import { StorageService } from "../services/storageService";

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

  // @Put("/:key")
  // async put(req: Request): Promise<Response> {
  //   const ittyRequest: IRequest = <IRequest>req;
  //   const value = await req.json();
  //   this.storageService.update(ittyRequest.params.key, value);
  //   return new Response(null, { status: 204 });
  // }
}
