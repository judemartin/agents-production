import { runLLM } from '../../src/llm'
import { dadJokeToolDefinition } from '../../src/tools/dadJoke'
import { runEval } from '../evalTools'
import { ToolCallMatch } from '../scorers'

const createToolCallMessage = (toolName: string) => ({
  role: 'assistant',
  tool_calls: [
    {
      type: 'function',
      function: {
        name: toolName,
      },
    },
  ],
})

runEval('dadJoke', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [dadJokeToolDefinition],
    }),
  data: [
    // {
    //   input: 'Tell me a funny dad joke',
    //   expected: createToolCallMessage(dadJokeToolDefinition.name),
    // },
    // {
    //   input: 'hi',
    //   expected: createToolCallMessage(dadJokeToolDefinition.name),
    // },
    {
      input: 'Tell me another funny dad joke',
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
    // {
    //   input: 'Tell me about the weather',
    //   expected: createToolCallMessage(dadJokeToolDefinition.name),
    // },
  ],
  scorers: [ToolCallMatch],
})
