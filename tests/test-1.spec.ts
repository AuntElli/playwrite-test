import { test, expect } from '@playwright/test';
import { getMainPageLocators } from './mainPage.locators';

test('Основные элементы навигации отображаются', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const locators = getMainPageLocators(page);

  await expect(locators.logo).toBeVisible();
  await expect(locators.docs).toBeVisible();
  await expect(locators.mcp).toBeVisible();
  await expect(locators.cli).toBeVisible();
  await expect(locators.api).toBeVisible();
  await expect(locators.node).toBeVisible();
  await expect(locators.github).toBeVisible();
  await expect(locators.discord).toBeVisible();
  await expect(locators.themeToggle).toBeVisible();
  await expect(locators.search).toBeVisible();
});
