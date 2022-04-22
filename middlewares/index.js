function stringNormalized(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function toCamelCase(list) {
    return list.map(fieldName => {
        let label = fieldName.split(' ')
            .map(field => field[0].toUpperCase() + field.slice(1))
            .join('');
        label = stringNormalized(label[0].toLowerCase() + label.slice(1));
        return label;
    })
}


function csvtojson(csv) {
    const data = csv.replace('\r', '').split('\n');
    const fieldName = toCamelCase(data[0].split(';'));

    const jsonArray = [];
    const lastElement = data.length - 1;
    data.slice(1, lastElement).forEach(data => {
        const object = {};
        const results = data.split(';');
        results.forEach((result, index) => {
            object[fieldName[index]] = result;
        });
        jsonArray.push(object);
    })
    return jsonArray;
}

module.exports = { csvtojson, toCamelCase, stringNormalized };