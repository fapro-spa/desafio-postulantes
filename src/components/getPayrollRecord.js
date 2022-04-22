import scrapeData from '../components/scrapeData'
import getDetails from '../components/getDetails'
import getRecordList from '../components/getRecordList'
import { URL } from '../storage'

const getPayrollRecord = async () => {
	const getData = async (page) => {
		const details = await getDetails(page)
		const recordList = await getRecordList(page)

		return {
			details,
			recordList
		}
	}

	const data = await scrapeData(URL, getData)

	return data
}

export default getPayrollRecord