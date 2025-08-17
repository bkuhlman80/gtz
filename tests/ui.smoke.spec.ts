import { test, expect } from '@playwright/test';

const vps = [
  { name: 'iphone', size: { width: 390, height: 844 } },
  { name: 'tablet', size: { width: 768, height: 1024 } },
  { name: 'desktop', size: { width: 1280, height: 800 } },
];

for (const vp of vps) {
  test(`landing page layout @ ${vp.name}`, async ({ page }, testInfo) => {
    await page.setViewportSize(vp.size);
    await page.goto('/', { waitUntil: 'networkidle' });

    // Always capture a screenshot for debugging
    await page.screenshot({ path: `screens/${vp.name}-precheck.png`, fullPage: true });

    // Soft checks until IDs exist
    const wheel = page.locator('[data-testid="wheel"]');
    const grid  = page.locator('[data-testid="card-grid"]');
    const sub   = page.locator('[data-testid="subscribe"]');

    // If missing, log and keep going so you still get screenshots
    testInfo.attach(`wheel-present-${vp.name}`, {
      body: Buffer.from(String(await wheel.count())),
      contentType: 'text/plain'
    });

    await expect(wheel, 'Wheel missing. Add data-testid="wheel" to Wheel.tsx.').toBeVisible({ timeout: 10000 });
    await expect(grid,  'Grid missing. Add data-testid="card-grid" to CardGrid.tsx.').toBeVisible({ timeout: 10000 });
    await expect(sub,   'Subscribe block missing. Wrap Substack in data-testid="subscribe".').toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: `screens/${vp.name}.png`, fullPage: true });
  });
}
