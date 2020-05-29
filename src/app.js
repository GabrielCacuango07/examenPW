const chalk = require('chalk');
const argv = require('./config/yargs').argv;
const {
    importCSV,
    saveData,
    getCountryData
} = require('./controllers/buscar')
let comand = argv._[0];

let pais = argv.country
let anio = argv.year
let arch = argv.file
switch (comand) {
    case 'mostrar':
        let mostrar = async() => {
            data = await importCSV(arch);
            test = getCountryData(data, pais, anio)
            console.log(test);
        }
        mostrar().then()
            //console.log('comando mostrar');
            //
            //console.log(test);


        break;
    case 'guardar':
        console.log('comando guardar ');
        break;
    default:
        console.log('Comando no reconocido');
        break;
}