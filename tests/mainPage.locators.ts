import type { Page } from '@playwright/test';

export const getMainPageLocators = (page: Page) => ({
  logo: page.getByRole('link', { name: 'Playwright logo Playwright' }),
  docs: page.getByRole('link', { name: 'Docs' }),
  mcp: page.getByRole('link', { name: 'MCP', exact: true }),
  cli: page.getByRole('link', { name: 'CLI', exact: true }),
  api: page.getByRole('link', { name: 'API' }),
  node: page.getByRole('button', { name: 'Node.js' }),
  github: page.getByLabel('GitHub repository'),
  discord: page.getByLabel('Discord server'),
  themeToggle: page.getByRole('button', { name: /Switch between dark and light mode/ }),
  search: page.getByRole('button', { name: /Search/ }),
  heroHeading: page.getByRole('heading', { name: 'Playwright enables reliable' }),
  getStarted: page.getByRole('link', { name: 'Get started' }),
  pageRoot: page.locator('html'),
});
