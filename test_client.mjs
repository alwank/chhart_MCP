
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

async function main() {
    const url = "https://mcp.chhart.app/sse";
    console.log(`Connecting to ${url}...`);

    const transport = new SSEClientTransport(new URL(url));
    const client = new Client(
        {
            name: "test-client",
            version: "1.0.0",
        },
        {
            capabilities: {},
        }
    );

    try {
        console.log("Connecting...");
        await client.connect(transport);
        console.log("Connected!");

        console.log("Listing tools...");
        const tools = await client.listTools();
        console.log("Tools found:", tools.tools.map(t => t.name));

        console.log("Calling create_flowchart...");
        const result = await client.callTool({
            name: "create_flowchart",
            arguments: {
                content: "A -> B",
                title: "Test Chart"
            }
        });

        console.log("Flowchart result:", JSON.stringify(result, null, 2));

        console.log("Calling create_sankey...");
        const resultSankey = await client.callTool({
            name: "create_sankey",
            arguments: {
                flows: [
                    { source: "Start", target: "Middle", value: 10 },
                    { source: "Middle", target: "End", value: 5 }
                ],
                title: "Test Sankey"
            }
        });
        console.log("Sankey result:", JSON.stringify(resultSankey, null, 2));

    } catch (error) {
        console.error("Error:", error);
    } finally {
        console.log("Closing...");
        await client.close();
    }
}

main();
