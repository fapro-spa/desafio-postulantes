import { extractDate } from '../utils'

const getDetails = async (page) => {
	const title = await page.$eval('.title', (node) => node.innerText)
	const descrition = await page.$eval('.title + p', (node) => node.innerText)
	const lastUpdateDate = await page.$eval('#fechaActualizacion', (node) => node.innerText)

	return { title, descrition, lastUpdateDate: extractDate(lastUpdateDate) }
}

export default getDetails