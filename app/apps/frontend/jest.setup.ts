import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for MSW (some environments need this)
import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof TextDecoder;

// Polyfill window.matchMedia for jsdom (used by useBreakpoint in MonthSelector)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});
