import { scraperObject } from "./pageScraper.js";

class ScrapeAll {
  async scraper(browserInstance) {
    let browser;
    try {
      //awaiting the instance and then use the scraper
      browser = await browserInstance;
      await scraperObject.scraper(browser);
    } catch (err) {
      console.log("Could not resolve the browser instance => ", err);
    }
  }
}

export const scrapeAll = new ScrapeAll();
