
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { open: 'never' }], ['list']],
  use: { baseURL: 'https://gtz-one.vercel.app', trace: 'on-first-retry' },
  projects: [
    { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'Desktop Safari', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Safari',  use: { ...devices['iPhone 14 Pro'] } },
    { name: 'Mobile Chrome',  use: { ...devices['Pixel 7'] } },
  ],
});
