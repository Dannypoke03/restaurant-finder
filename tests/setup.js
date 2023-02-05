import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import fetch from "node-fetch";
import { afterEach, expect } from 'vitest';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Setup fetch
globalThis.fetch = fetch

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});