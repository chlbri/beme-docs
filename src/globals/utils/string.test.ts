import { describe, expect, it } from 'vitest';
import { capitalize } from './string';

describe('capitalize', () => {
  it('should capitalize the first letter of a word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should handle already capitalized strings', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('should handle single character strings', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('should handle uppercase single character', () => {
    expect(capitalize('A')).toBe('A');
  });

  it('should only capitalize the first letter of a multi-word string', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });

  it('should handle strings with numbers', () => {
    expect(capitalize('123abc')).toBe('123abc');
  });

  it('should handle strings starting with special characters', () => {
    expect(capitalize('!hello')).toBe('!hello');
  });

  it('should throw error for empty strings', () => {
    expect(() => capitalize('')).toThrow();
  });
});
