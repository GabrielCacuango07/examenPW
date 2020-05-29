const chalk = require('chalk');
const argv = require('./configs/yargs').argv;
let comand = argv._[0];

let pais = argv.country
let anio = argv.year
let arch = argv.file
switch (comand) {
    case 'mostrar':
        console.log('comando mostrar');
        break;
    case 'guardar':
        console.log('comando guardar ');
        break;
    default:
        console.log('Comando no reconocido');
        break;
}