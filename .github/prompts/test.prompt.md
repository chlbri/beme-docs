# Test Generator Prompt

This prompt helps generate unit and integration tests for the project.

## Context

The project uses:

- **Test Framework**: Vitest
- **Testing Library**: @solidjs/testing-library
- **Assertions**: Vitest's expect
- **Mocking**: Vitest's vi
- **Framework**: SolidJS (latest stable)
- **TypeScript**: (latest stable - strict mode)

## Test Structure

Tests must follow this structure:

```
src/
├── features/
│   └── [feature-name]/
│       └── front/
│           ├── components/
│           │   ├── UserCard.tsx
│           │   └── UserCard.test.tsx  # Test next to the component
│           └── utils/
│               ├── formatters.ts
│               └── formatters.test.ts
│
└── globals/
    └── ui/
        └── molecules/
            ├── Button.tsx
            └── Button.test.tsx
```

## Testing Principles

### 1. SolidJS Component Tests

```typescript
import { render, screen } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(() => <Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(() => <Button onClick={handleClick}>Click</Button>);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(() => <Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 2. Utility Function Tests

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate, formatCurrency } from './formatters';

describe('formatters', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date)).toBe('15/01/2024');
    });

    it('handles invalid dates', () => {
      expect(formatDate(null)).toBe('');
    });
  });

  describe('formatCurrency', () => {
    it('formats currency with correct symbol', () => {
      expect(formatCurrency(1000, 'XOF')).toBe('1 000 XOF');
    });
  });
});
```

### 3. Signals and State Management Tests

```typescript
import { describe, it, expect } from 'vitest';
import { createRoot } from 'solid-js';
import { useAuth } from './auth.signal';

describe('useAuth signal', () => {
  it('initializes with no user', () => {
    createRoot(dispose => {
      const auth = useAuth();
      expect(auth.user()).toBeNull();
      expect(auth.isAuthenticated()).toBe(false);
      dispose();
    });
  });

  it('sets user on login', () => {
    createRoot(dispose => {
      const auth = useAuth();
      const user = { id: '1', name: 'Test User' };

      auth.login(user);

      expect(auth.user()).toEqual(user);
      expect(auth.isAuthenticated()).toBe(true);
      dispose();
    });
  });
});
```

## Checklist for a Good Test

- [ ] Descriptive test name (what is being tested + expected behavior)
- [ ] Arrange-Act-Assert pattern
- [ ] Mock external dependencies (API, localStorage, etc.)
- [ ] Cleanup after each test (dispose() for SolidJS)
- [ ] Accessibility tests for UI components
- [ ] Edge cases and error handling tests
- [ ] Coverage > 90% for critical functions

## Useful Commands

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage

# Run tests for a specific file
pnpm test UserCard.test.tsx
```

## Task

When this prompt is invoked, generate complete tests for the file or
component specified by the user by following:

1. **Analyze** the source code to identify what needs to be tested
2. **Create** a test file with the name `[filename].test.ts(x)`
3. **Cover** the following cases:
   - Normal behavior (happy path)
   - Edge cases
   - Error handling
   - Accessibility (for UI components)
4. **Follow** project conventions
5. **Verify** that imports are correct
6. **Ensure** that tests are executable

## Expected Output

Display only:

1. The path of the created test file
2. The number of generated tests
3. A summary of covered cases

Format:

```
✅ Tests created: src/features/auth/front/components/LoginForm.test.tsx
📊 12 tests generated
🎯 Coverage: happy path, edge cases, accessibility, errors
```

## N.B: No need for additional comments or detailed summary.
