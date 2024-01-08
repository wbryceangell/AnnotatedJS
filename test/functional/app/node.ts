import { initialize } from "@src";
import { createServerAdapter } from "@whatwg-node/server";
import { createServer } from "http";
import "isomorphic-fetch";
import "./controllers/storageController";
import "./controllers/postTest";

const requestHandler = initialize();
const ittyServer = createServerAdapter(requestHandler);
const httpServer = createServer(ittyServer);
httpServer.listen(3001);
console.log("listening at https://localhost:3001");
