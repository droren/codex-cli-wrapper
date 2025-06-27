# codex-cli-wrapper
`codex-cli-wrapper` is a small helper around
[codex-cli](https://github.com/openai/codex) to make local usage easier and to
ensure every command proposed by the LLM is actually executed. The wrapper works
with both OpenAI hosted models and local providers such as [Ollama](https://ollama.ai).

## Requirements
You must have `codex-cli` installed and accessible in your environment. See the
[official codex-cli repository](https://github.com/openai/codex) for
installation instructions.

## Installation
Clone this repository and install the dependencies:

```bash
git clone https://github.com/yourname/codex-cli-wrapper.git
cd codex-cli-wrapper
npm install
npm run build
```

To use the wrapper globally you can link the package:

```bash
npm link
```

After linking you can run `codex-cli-wrapper` from anywhere on your system.

## Main purpose
The wrapper simplifies interaction with `codex-cli` by providing a consistent
entry point and optional environment configuration. It allows advanced usage
patterns, such as executing multiple commands in sequence and automatically
approving model suggestions.

## Default setup
By default the wrapper assumes you have a local instance of Ollama running. The
wrapper forwards all requests to that local model while still handling the CLI
workflow provided by `codex-cli`.

### Example codex configuration
Create `~/.codex/config.json` with the following content to connect
`codex-cli` to a local Ollama instance running the `qwen2.5-coder` model
on your Mac mini M4 (16 GB memory):

```json
{
  "provider": "ollama",
  "model": "qwen2.5-coder",
  "providers": {
    "ollama": {
      "name": "Ollama",
      "baseURL": "http://localhost:11434/v1",
      "envKey": "OLLAMA_API_KEY"
    }
  }
}
```

With this configuration the wrapper will use your local model by default while
retaining the usual `codex-cli` workflow.

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


