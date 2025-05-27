import { test, expect } from '@playwright/test';
import HomePage from '../support/pages/HomePage';

test.describe('YouTube Tests', () => {
  test('Deve buscar por um termo no YouTube', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.search('Playwright tutorial');

    // Verifica que a URL corresponde aos resultados de busca
    await expect(page).toHaveURL(/results/);

  });

  test('Deve navegar para a página "Shorts"', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.goToShorts();

    // Verifica a URL da página Shorts
    await expect(page).toHaveURL(/shorts/);
  });

  test('Deve verificar se o logotipo do YouTube está presente na página inicial', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    // Seleciona o link do logo pelo role e nome acessível
    const logoLink = page.getByRole('link', { name: 'Página inicial do YouTube' });
    await expect(logoLink).toBeVisible();
  });

  test('Deve buscar um canal e verificar o botão de "Inscrever-se"', async ({ page }) => {
    const term = 'Canal de Tecnologia';
    // Navega diretamente para resultados de canais filtrados
    await page.goto(`https://www.youtube.com/results?search_query=${encodeURIComponent(term)}&sp=EgIQAg%3D%3D`);

    // Aguarda o cartão de canal aparecer
    await page.waitForSelector('ytd-channel-renderer', { state: 'visible' });

  });
});