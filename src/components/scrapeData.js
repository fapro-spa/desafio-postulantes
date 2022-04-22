import puppeteer from 'puppeteer'

const scrapeData = async (url, handleData) => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.setDefaultNavigationTimeout(0);

	await page.goto(url)

	return new Promise(async (resolve, reject) => {
		try {
			const data = await handleData(page);
			resolve(data)
			await browser.close()
		} catch(err) {
			reject(err)
			await browser.close()
		}
	})
}

export default scrapeData