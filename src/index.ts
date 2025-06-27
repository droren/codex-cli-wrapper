#!/usr/bin/env node
import { spawn } from 'child_process';

export function run(
  args: string[] = process.argv.slice(2),
  spawner: typeof spawn = spawn,
  exitFn: (code?: number) => never = process.exit,
): void {
  const codexArgs = args;

  const child = spawner('codex', codexArgs, {
    stdio: 'inherit',
    env: process.env,
  });

  child.on('exit', code => {
    exitFn(typeof code === 'number' ? code : 1);
  });
}

if (require.main === module) {
  run();
}
