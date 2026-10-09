import { existsSync } from "node:fs"
import { defineConfig, devices } from "@playwright/test"

const executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH ??
  (existsSync("/usr/bin/google-chrome") ? "/usr/bin/google-chrome" : undefined)

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    launchOptions: executablePath ? { executablePath } : undefined,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Tests run against a production build. EXPOSE_TESTING_API keeps @next/playwright's
  // instant() working there (experimental.exposeTestingApiInProductionBuild).
  webServer: {
    command: "EXPOSE_TESTING_API=1 npm run build && npm run start -- -H 127.0.0.1 -p 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
})
