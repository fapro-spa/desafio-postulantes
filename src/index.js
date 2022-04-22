import getPayrollRecord from './components/getPayrollRecord'
import fs from 'fs-extra'

const writeFileJson = (details, recordList) => {
	fs.outputJsonSync('./API/nomina-registros.json', {
		...details,
		registros: {
			...recordList
		}
	}, {spaces: 2})	
}

async function main() {
	const { details, recordList } = await getPayrollRecord()

	writeFileJson(details, recordList)

	console.log('El archivo fue escrito en ./API/nomina-registros.json')
}

main()