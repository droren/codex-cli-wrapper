import { run } from '../src/index';
function createMockSpawn() {
  const on = jest.fn();
  const mockChild = { on } as any;
  const mockSpawn = jest.fn(() => mockChild) as any;
  return { mockSpawn, on };
}

describe('exports', () => {
  it('should export run function', () => {
    expect(typeof run).toBe('function');
  });
});

describe('run', () => {
  it('spawns codex with provided args', () => {
    const { mockSpawn } = createMockSpawn();
    run(['--ask'], mockSpawn, () => {
      throw new Error('should not exit');
    });
    expect(mockSpawn).toHaveBeenCalledWith('codex', ['--ask'], expect.any(Object));
  });

  it('spawns codex with no args for interactive mode', () => {
    const { mockSpawn } = createMockSpawn();
    run([], mockSpawn, () => {
      throw new Error('should not exit');
    });
    expect(mockSpawn).toHaveBeenCalledWith('codex', [], expect.any(Object));
  });

  it('forwards dry-run option', () => {
    const { mockSpawn } = createMockSpawn();
    run(['--dry-run'], mockSpawn, () => {
      throw new Error('should not exit');
    });
    expect(mockSpawn).toHaveBeenCalledWith('codex', ['--dry-run'], expect.any(Object));
  });
});
