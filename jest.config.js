/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ["**/test/**/*.test.ts"],
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy"
    }
};