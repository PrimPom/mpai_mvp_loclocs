import '@testing-library/jest-dom';

// global test config
global.console = {
  ...console,
  // delete logs in test mode
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: console.warn,
  error: console.error,
};