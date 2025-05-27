import { Page } from '@playwright/test';
import HomeElements from '../elements/HomeElements';

export default class HomePage {
  private page: Page;
  private elements: HomeElements;

  constructor(page: Page) {
    this.page = page;
    this.elements = new HomeElements();
  }

  // Abre a home do YouTube e aguarda carregamento
  async navigate() {
    await this.page.goto('https://www.youtube.com');
    await this.page.waitForLoadState('networkidle');
  }

  // Preenche o termo de busca e aguarda navegação para resultados
  async search(term: string) {
    await this.page.fill(this.elements.searchInput, term);
    await Promise.all([
      this.page.waitForNavigation({ url: /results/ }),
      this.page.click(this.elements.searchButton),
    ]);
  }

  // Clica em "Shorts" e aguarda navegação
  async goToShorts() {
    await Promise.all([
      this.page.waitForNavigation({ url: /shorts/ }),
      this.page.click(this.elements.shortsLink),
    ]);
  }
}