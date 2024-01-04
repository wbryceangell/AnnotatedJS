import { Router } from "./router";

export interface Config {
  getRouter(): Router;
}
