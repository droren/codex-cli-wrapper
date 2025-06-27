# codex-cli-wrapper
`codex-cli-wrapper` is a small helper around
[codex-cli](https://github.com/openai/codex) to make local usage easier and to
ensure every command proposed by the LLM is actually executed. The wrapper works
with both OpenAI hosted models and local providers such as [Ollama](https://ollama.ai).

## Requirements
You must have `codex-cli` installed and accessible in your environment. See the
[official codex-cli repository](https://github.com/openai/codex) for
installation instructions.

## Main purpose
The wrapper simplifies interaction with `codex-cli` by providing a consistent
entry point and optional environment configuration. It allows advanced usage
patterns, such as executing multiple commands in sequence and automatically
approving model suggestions.

## Default setup
By default the wrapper assumes you have a local instance of Ollama running. The
wrapper forwards all requests to that local model while still handling the CLI
workflow provided by `codex-cli`.

## Usage scenarios

### Interactive mode
Running the wrapper with no prompt will start `codex` in interactive mode. Any commands suggested by the model will run automatically in `full-auto` mode or on request when using `ask` mode.

```bash
# full-auto interactive session
./codex-cli-wrapper

# ask mode interactive session
./codex-cli-wrapper --ask
```

You can combine the interactive mode with other flags such as `--dry-run` to preview the actions:

```bash
./codex-cli-wrapper --dry-run --ask
```

### 1. Local model
When using a local model (e.g. Ollama) no extra flags are required. Simply run:

```bash
./codex-cli-wrapper "create a file README_NEW.md with the text 'Hello World'"
```

### 2. Remote model
If you want to use the default OpenAI endpoint, export the API key and disable
the local model flag:

```bash
export OPENAI_API_KEY="sk-..."
./codex-cli-wrapper --remote "list all files in the src folder"
```

### 3. Custom working directory
You can run the wrapper in any project by passing the `--cwd` option:

```bash
./codex-cli-wrapper --cwd ~/projects/my-app "add jest and a basic test suite"
```

## Automatic CLI code generation example

The wrapper can be used to let Codex generate small utilities automatically. For
example, to generate a Node.js CLI for compressing images you could run:

```bash
./codex-cli-wrapper "create a node CLI using yargs that compresses PNG files in
a given directory with sharp"
```

Codex will propose the code, the wrapper writes the files, installs any
dependencies and runs the commands so you end up with a functioning tool
without manual intervention.

## Use cases

- Bootstrapping new projects or scripts
- Running refactors across multiple files
- Automating repetitive development tasks
- Generating one-off utilities as shown above

## Future improvements

The current version is intentionally lightweight. Potential additions include:

- More robust configuration via a YAML or JSON file
- Interactive approval of generated commands
- Support for additional local model providers
- Integration tests for the wrapper itself


