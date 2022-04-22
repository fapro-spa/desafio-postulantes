
const getRecordHeader = async (page) => {
	const header = await page.$$eval('#tabledatasii thead tr th', (nodes) => nodes.map((node) => node.innerText))

	return header;
}

const getRecordBodyItems = async (page) => {
	const bodyItems = await page.$$eval('#tabledatasii tbody tr', (nodes) => nodes.map((node) => {
		const children = Array.from(node.children)
		return children.map((node) => node.innerText)
	}))

	return bodyItems
}


const getRecordList = async (page) => {
	const header = await getRecordHeader(page)
	const bodyItems = await getRecordBodyItems(page)

	return { header, bodyItems }
}

export default getRecordList