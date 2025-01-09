module.exports = {
  preset: 'ts-jest', // Tells Jest to use ts-jest for transforming TypeScript files
  testEnvironment: 'node', // You can also use 'jsdom' depending on your environment (e.g., if you're testing a frontend)
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transforms TypeScript files using ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'], // Includes TypeScript extensions
  // If you're using ECMAScript Modules, use this instead of the default transform:
  // transform: {
  //   '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  // },
};
