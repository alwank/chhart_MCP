
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const mockRes = {
    // Mock minimal methods needed by transport
    writeHead: () => { },
    write: () => { },
    end: () => { },
    on: () => { },
    once: () => { },
    emit: () => { },
    setHeader: () => { }
};

try {
    const transport = new SSEServerTransport("/message", mockRes);
    console.log("Session ID after ctor:", transport.sessionId);

    const server = new Server({ name: "test", version: "1" }, { capabilities: {} });
    server.connect(transport).then(() => {
        console.log("Session ID after connect:", transport.sessionId);
        // Force close to exit
        process.exit(0);
    });
} catch (e) {
    console.error(e);
}
