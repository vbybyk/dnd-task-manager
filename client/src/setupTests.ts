import "@testing-library/jest-dom";

import { server } from "./TestUtils/mocks/server";

// Mock ResizeObserver to prevent NaN height warnings from Ant Design components
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

// Mock getComputedStyle to return consistent values and prevent NaN height warnings
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: (prop: string) => {
      // Return specific values for properties that might cause NaN issues
      const styleMap: Record<string, string> = {
        paddingLeft: "0px",
        paddingRight: "0px",
        paddingTop: "0px",
        paddingBottom: "0px",
        marginLeft: "0px",
        marginRight: "0px",
        marginTop: "0px",
        marginBottom: "0px",
        borderBottomWidth: "0px",
        borderTopWidth: "0px",
        borderRightWidth: "0px",
        borderLeftWidth: "0px",
        height: "auto",
        width: "auto",
        lineHeight: "normal",
        fontSize: "14px",
      };
      return styleMap[prop] || "0px";
    },
  }),
});
