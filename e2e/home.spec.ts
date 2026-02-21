import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the header', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should display navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: /casino/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /sports/i })).toBeVisible();
  });

  test('should display login button when not authenticated', async ({ page }) => {
    await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible();
  });

  test('should display signup button when not authenticated', async ({ page }) => {
    await expect(page.getByRole('button', { name: /cadastre/i })).toBeVisible();
  });

  test('should have skip link for accessibility', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: /pular para o conteúdo principal/i });
    await expect(skipLink).toBeAttached();
  });
});

test.describe('Navigation', () => {
  test('should navigate to casino page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /casino/i }).first().click();
    await expect(page).toHaveURL(/.*casino/);
  });

  test('should navigate to sports page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /sports/i }).first().click();
    await expect(page).toHaveURL(/.*sports/);
  });

  test('should navigate to promotions page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /promoções/i }).first().click();
    await expect(page).toHaveURL(/.*promotions/);
  });
});

test.describe('Theme Toggle', () => {
  test('should toggle theme when button is clicked', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.getByRole('button', { name: /alternar tema/i });
    await expect(themeToggle).toBeVisible();
    
    // Get initial state
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');
    
    // Click toggle
    await themeToggle.click();
    
    // Check if class changed
    const newClass = await html.getAttribute('class');
    expect(newClass).not.toBe(initialClass);
  });
});

test.describe('Login Modal', () => {
  test('should open login modal when login button is clicked', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('button', { name: /entrar/i }).click();
    
    // Check if login form is visible
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/senha/i)).toBeVisible();
  });

  test('should have email and password fields in login modal', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('button', { name: /entrar/i }).click();
    
    const emailInput = page.getByPlaceholder(/email/i);
    const passwordInput = page.getByPlaceholder(/senha/i);
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });
});
