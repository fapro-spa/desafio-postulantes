import { startBrowser } from "./src/browser.js";
import { scrapeAll } from "./src/pageController.js";

//Start the browser and create a browser instance
let browserInstance = startBrowser.start();

// Pass the browser instance to the scraper controller
scrapeAll.scraper(browserInstance);
