import { test, expect, type Page } from '@playwright/test';
import { getMainPageLocators } from './mainPage.locators';

const elements = [
  {
    locator: (page: Page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo link',
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'MCP', exact: true }),
    name: 'MCP link',
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'CLI', exact: true }),
    name: 'CLI link',
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'API' }),
    name: 'API link',
  },
  {
    locator: (page: Page) => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
  },
  {
    locator: (page: Page) => page.getByLabel('GitHub repository'),
    name: 'GitHub icon',
  },
  {
    locator: (page: Page) => page.getByLabel('Discord server'),
    name: 'Discord icon',
  },
  {
    locator: (page: Page) =>
      page.getByRole('button', { name: /Switch between dark and light mode/ }),
    name: 'Light mode icon',
  },
  {
    locator: (page: Page) => page.getByRole('button', { name: /Search/ }),
    name: 'Search button',
  },
];

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    const steps: Promise<void>[] = [];

    elements.forEach(({ locator, name }) => {
      steps.push(test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      }));
    });

    await Promise.all(steps);
  });

  test('Проверка названия элементов навигации хедера', async ({ page }) => {
    const locators = getMainPageLocators(page);

    await expect(locators.logo).toContainText('Playwright');
    await expect(locators.docs).toContainText('Docs');
    await expect(locators.mcp).toContainText('MCP');
    await expect(locators.cli).toContainText('CLI');
    await expect(locators.api).toContainText('API');
    await expect(locators.node).toContainText('Node.js');
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
    const locators = getMainPageLocators(page);

    await expect.soft(locators.logo).toHaveAttribute('href', '/');
    await expect.soft(locators.docs).toHaveAttribute('href', '/docs/intro');
    await expect.soft(locators.api).toHaveAttribute('href', '/docs/api/class-playwright');
    await expect
      .soft(locators.github)
      .toHaveAttribute('href', 'https://github.com/microsoft/playwright');
  });

  test('Проверка переключения light mode', async ({ page }) => {
    const locators = getMainPageLocators(page);

    await locators.themeToggle.click();
    await locators.themeToggle.click();

    await expect(locators.pageRoot).toHaveAttribute('data-theme', 'dark');
  });

  test('Проверка заголовка страницы', async ({ page }) => {
    const locators = getMainPageLocators(page);

    await expect.soft(locators.heroHeading).toBeVisible();
    await expect.soft(locators.heroHeading).toContainText('Playwright enables reliable web automation');
  });

  test('Проверка кнопки Get started', async ({ page }) => {
    const locators = getMainPageLocators(page);

    await expect.soft(locators.getStarted).toBeVisible();
    await expect.soft(locators.getStarted).toContainText('Get started');
    await expect.soft(locators.getStarted).toHaveAttribute('href', '/docs/intro');
  });
});
