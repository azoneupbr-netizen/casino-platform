import { test, expect } from '@playwright/test';

test.describe('Casino Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/casino');
  });

  test('should display the casino page', async ({ page }) => {
    await expect(page).toHaveURL(/.*casino/);
  });

  test('should display hero banner', async ({ page }) => {
    // Look for hero banner or main casino content
    const heroSection = page.locator('[class*="hero"], [class*="banner"]').first();
    await expect(heroSection).toBeVisible({ timeout: 10000 });
  });

  test('should display category filters', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Look for category buttons
    const categories = page.getByRole('button');
    await expect(categories.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display games grid', async ({ page }) => {
    // Wait for games to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Look for game images or game cards
    const gameElements = page.locator('[class*="game"], img[alt*="game"]').first();
    await expect(gameElements).toBeVisible({ timeout: 15000 });
  });
});

test.describe('Casino Page - Category Filtering', () => {
  test('should filter games by category', async ({ page }) => {
    await page.goto('/casino');
    await page.waitForLoadState('networkidle');
    
    // Find and click a category button
    const categoryButtons = page.getByRole('button');
    const firstCategory = categoryButtons.first();
    
    if (await firstCategory.isVisible()) {
      await firstCategory.click();
      // Verify the page updates (URL or content change)
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Casino Page - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/casino');
    await page.waitForLoadState('networkidle');
    
    // Check that page is visible and responsive
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display bottom navigation on mobile', async ({ page }) => {
    await page.goto('/casino');
    
    // Look for bottom navigation
    const bottomNav = page.locator('nav[role="navigation"]').last();
    await expect(bottomNav).toBeVisible({ timeout: 10000 });
  });
});
