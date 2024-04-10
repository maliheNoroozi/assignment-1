module.exports = {
  // The root of your source code, typically 'src'
  roots: ["<rootDir>/src"],

  // Jest transformations -- this adds support for TypeScript using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  // setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],

  // Specify the test environment
  testEnvironment: "jest-environment-jsdom",

  // Jest coverage configuration
  collectCoverageFrom: [
    "__test__/*.{js,jsx,ts,tsx}",
    "src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/node_modules/",
    "!<rootDir>/path/to/ignore/",
  ],

  // Module file extensions for importing
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
};
