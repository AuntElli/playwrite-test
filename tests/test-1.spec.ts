import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
  await expect(page.getByLabel('GitHub repository')).toBeVisible();
  await expect(page.getByLabel('Discord server')).toBeVisible();
  await expect(page.getByLabel('Switch between dark and light')).toBeVisible();
  await expect(page.getByLabel('Search (Command-K)')).toBeVisible();
});
