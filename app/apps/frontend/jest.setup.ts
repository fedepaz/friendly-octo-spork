import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for MSW (some environments need this)
import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof TextDecoder;
