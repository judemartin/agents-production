import { runEval } from "../evalTools.ts";
import { runLLM } from "../../src/llm.ts";
import { redditToolDefinition } from "../../src/tools/reddit.ts";
import { ToolCallMatch } from "../scorers.ts";

const createToolCallMessage = (toolName: string) => ({
  role: 'assistant',
  tool_calls: [
    {
      type: 'function',
      function: { name: toolName }
    }
  ]
});

runEval('reddit', {
  task: (input) => runLLM({
    messages: [{ role: 'user', content: input }],
    tools: [redditToolDefinition]
  }),
  data: [
    {
      input: 'find me something interesting from reddit',
      expected: createToolCallMessage(redditToolDefinition.name)
    },
    // {
    //   input: 'hi',
    //   expected: createToolCallMessage(redditToolDefinition.name)
    // }
  ],
  scorers: [ToolCallMatch]
});