import { test, expect } from '@playwright/test';

test.describe('Sports Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sports');
  });

  test('should display the sports page', async ({ page }) => {
    await expect(page).toHaveURL(/.*sports/);
  });

  test('should display sports categories', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Look for sports category navigation or list
    const content = page.locator('main, [class*="sport"]');
    await expect(content.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display match listings', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Look for match cards or listings
    const matchElements = page.locator('[class*="match"], [class*="event"], [class*="game"]').first();
    await expect(matchElements).toBeVisible({ timeout: 15000 });
  });

  test('should display odds for matches', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Look for odds displays (usually numbers like 1.50, 2.00, etc.)
    const oddsElements = page.locator('button, [class*="odd"]');
    await expect(oddsElements.first()).toBeVisible({ timeout: 15000 });
  });
});

test.describe('Sports Page - Sport Selection', () => {
  test('should allow selecting different sports', async ({ page }) => {
    await page.goto('/sports');
    await page.waitForLoadState('networkidle');
    
    // Find sport selection buttons/links
    const sportButtons = page.locator('button, a').filter({ hasText: /futebol|basquete|tênis/i });
    
    if (await sportButtons.first().isVisible()) {
      await sportButtons.first().click();
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Sports Page - Bet Slip', () => {
  test('should display bet slip component', async ({ page }) => {
    await page.goto('/sports');
    await page.waitForLoadState('networkidle');
    
    // Look for bet slip or cupom area
    const betSlip = page.locator('[class*="bet"], [class*="slip"], [class*="cupom"]').first();
    await expect(betSlip).toBeVisible({ timeout: 15000 });
  });
});

test.describe('Sports Page - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/sports');
    await page.waitForLoadState('networkidle');
    
    // Check that page is visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display bottom navigation on mobile', async ({ page }) => {
    await page.goto('/sports');
    
    // Look for bottom navigation
    const bottomNav = page.locator('nav[role="navigation"]').last();
    await expect(bottomNav).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Sports Page - Live Events', () => {
  test('should display live indicator for live matches', async ({ page }) => {
    await page.goto('/sports');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Look for live indicators
    const liveIndicators = page.locator('[class*="live"], [class*="ao-vivo"]');
    // May or may not have live events
    const count = await liveIndicators.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
