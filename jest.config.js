/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  bail: 1,
  testEnvironment: "node",
  rootDir: "./src",
  moduleNameMapper: {
    "@shared/(.*)": "<rootDir>/shared/$1",
    "@modules/(.*)": "<rootDir>/modules/$1",
    "@/(.*)": "<rootDir>/$1",
  },
};
