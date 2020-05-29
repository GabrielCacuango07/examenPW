const argumentos = {
    file: {
        require: true,
        alias: 'f',
        desc: ' Permite establecer el path del archivo CSV que contiene los datos a analizar',
    },
    country: {
        require: true,
        alias: 'c',
        default: 'ECU',
        desc: ' Permite determinar el país a analizar a través de su código ISO 3166 ALPHA-3 '
    },
    year: {

        alias: 'y',
        default: '1960',
        desc: ' Permite especificar el año para el cual se requiere las estadísticas. Por defecto, 1960'
    }
}
const argv = require('yargs')
    .command('mostrar', ' Publica el valor buscado', argumentos)
    .command('guardar', 'Almacena los resultados de las estadisticas de un archivo', argumentos)
    .help()
    .demandCommand(1)
    .alias('h', 'help')
    .argv;


module.exports = {
    argv
}