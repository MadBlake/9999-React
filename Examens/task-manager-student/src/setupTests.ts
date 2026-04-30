// src/setupTests.ts
import '@testing-library/jest-dom'

// Mock localStorage
const localStorageMock = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
}

globalThis.localStorage = localStorageMock as any
