const { promises: fs } = require('fs');
const csvToJson = require('csvtojson');
const open = require('open');
const chalk = require('chalk');
const validCountries = require('../model/includes.json');

const saveData = async(datos, pais, anio) => {
    let date = JSON.stringify(datos, 1, 2);
    path = `${pais}-${anio}.txt`
    var dir = './src/resultados'
    fs.mkdir(dir, function(e) {
        if (!e || (e && e.code === 'EEXIST')) {
            //do something with contents 
            console.log('hola ');
        } else {
            //debug console.log(e); 
            console.log('no existe');
        }
    });

    try {
        await fs.writeFile(`${dir}/${path}`, date)
        console.log(
            chalk.cyan('El archivo ha sido guardado puedes verlo en el siguiente directorio: ') +
            chalk.yellow(`${dir}/${path}`));
        await open(`${dir}/${path}`)

    } catch (error) {
        throw new String('Error al guardar el archivo, no tiene permisos')
    }
}

const getCountryData = (data, code, anio) => {
    const myCountry = data.find(country => country['Country Code'] === code.toUpperCase())

    if (!myCountry) {
        throw new Error(
            'No podemos obtener datos para el pais especificado, no se encuentra en la lista de datos o el formato no es valido. Use el estandar ISO 3166-ALPHA-3.')
    }


    return {
        Datos: myCountry['Indicator Name'],
        codigo: myCountry['Country Code'],
        nombre: myCountry['Country Name'],
        anio,
        Valor: parseFloat(myCountry[anio])
    };


}

const importCSV = async path => {

    const validCodes = validCountries.p_codigo;
    const csvFile = await fs.readFile(path, 'utf-8')
        .catch(err => { throw new Error('El archivo no se encuentra.') })


    let lines = csvFile.split(/\r?\n/);
    let csvString = ''
    lines.filter((value, index) => {
        if (index >= 4) {
            csvString += value + '\n'
        }
    });

    let csvData = await csvToJson().fromString(csvString);
    if (csvData.length === 0) {
        throw new Error('El formato del archivo no es valido.')
    }

    let excludes = []
    csvData = csvData.filter(country => {
        let isValid = validCodes.includes(country['Country Code'])
        if (isValid) {
            return country
        } else {
            excludes.push({
                name: country['Country Name'],
                code: country['Country Code'],
            })
        }

    })

    return csvData;

}


module.exports = {
    importCSV,
    getCountryData,
    saveData
}