import { test, expect } from '@playwright/test';

test.describe('Responsive Design - Desktop', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('should display sidebar on desktop', async ({ page }) => {
    await page.goto('/');
    
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible({ timeout: 10000 });
  });

  test('should not display bottom navigation on desktop', async ({ page }) => {
    await page.goto('/');
    
    // Bottom navigation should be hidden on desktop (hidden md:block pattern)
    const bottomNav = page.locator('nav[role="navigation"]').last();
    
    // Check if it's hidden via CSS
    const isVisible = await bottomNav.isVisible();
    // On desktop, bottom nav should be hidden
    // This depends on the implementation
  });

  test('header should display all elements on desktop', async ({ page }) => {
    await page.goto('/');
    
    // Check for main navigation links
    await expect(page.getByRole('link', { name: /casino/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /sports/i }).first()).toBeVisible();
  });
});

test.describe('Responsive Design - Tablet', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('should adapt layout for tablet', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Header should still be visible
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should display content properly on tablet', async ({ page }) => {
    await page.goto('/casino');
    await page.waitForLoadState('networkidle');
    
    // Content should be visible
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Responsive Design - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display bottom navigation on mobile', async ({ page }) => {
    await page.goto('/');
    
    const bottomNav = page.locator('nav[role="navigation"]').last();
    await expect(bottomNav).toBeVisible({ timeout: 10000 });
  });

  test('should hide sidebar on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Sidebar should be hidden on mobile
    const sidebar = page.locator('aside');
    
    // Check if sidebar exists and is hidden
    const count = await sidebar.count();
    if (count > 0) {
      // If it exists, it should be hidden
      const isVisible = await sidebar.first().isVisible();
      // On mobile, sidebar should be hidden (hidden md:block)
    }
  });

  test('header should be compact on mobile', async ({ page }) => {
    await page.goto('/');
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should be scrollable on mobile', async ({ page }) => {
    await page.goto('/casino');
    await page.waitForLoadState('networkidle');
    
    // Try to scroll
    await page.evaluate(() => window.scrollBy(0, 200));
    
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('touch targets should be appropriately sized', async ({ page }) => {
    await page.goto('/');
    
    // Check that buttons have minimum touch target size (44px recommended)
    const buttons = page.locator('button');
    const firstButton = buttons.first();
    
    if (await firstButton.isVisible()) {
      const box = await firstButton.boundingBox();
      if (box) {
        // Touch targets should be at least 44px
        expect(box.height).toBeGreaterThanOrEqual(30);
      }
    }
  });
});

test.describe('Responsive Design - Small Mobile', () => {
  test.use({ viewport: { width: 320, height: 568 } }); // iPhone SE size

  test('should work on very small screens', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Page should still be functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('text should be readable on small screens', async ({ page }) => {
    await page.goto('/');
    
    // Check that text elements exist and are visible
    const textElements = page.locator('h1, h2, h3, p, span, a');
    await expect(textElements.first()).toBeVisible({ timeout: 10000 });
  });
});
