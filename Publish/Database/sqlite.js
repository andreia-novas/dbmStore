const sqlite = require('sqlite3').verbose();

/**
 * Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe criada
 * @param {any} object Representa o objeto retornado pela query à abse de dados
 * @param {any} type Representa o tipo de objeto que se pretende converter
 * @returns Devolve um objeto do tipo "type" com o conteúdo que está no objeto "object"
 */
function mapping(object, type) {
    if (type && object) { //Se o type não for passado como argumento devolve o próprio objeto retornado do módulo sqlite
        const obj = new type(); //Inicializar um objeto do tipo "type"
        Object.keys(object).forEach(function (dbProp) {
            let objProp = dbProp;
            //Se a classe possuir um objeto de mapeamento vai se buscar esse valor para a coluna que foi retornada. 
            //Porque as propriedades dos objetos podem ter nomes diferentes da mesma coluna na tabela
            if (type.mappingDBtoObject) 
                objProp = type.mappingDBtoObject[dbProp];
            //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
            if (obj.hasOwnProperty(objProp)) 
                obj[objProp] = object[dbProp];
        });
        return obj; //Devolve o objeto convertido
    }
    return object;
}

/**
 * Exportar uma função que recebe o caminho da base de dados a ser utilizado. Quando o módulo for utilizado deverá ser passado o caminho e a função retornará um objeto com 3 funções possíveis: all, get e run
 * 
 * @param {any} dbpath 
 * @returns 
 */
module.exports = function (dbpath) {
    return {
        all: function (statement, type, callback) {
            const db = new sqlite.Database(dbpath);
            db.all(statement, [], function (err, rows) {
                rows = rows.map(function (object) {
                    return mapping(object, type);
                });
                callback(rows);
            });
            db.close();
        },
        get: function (statement, params, type, callback) {
            const db = new sqlite.Database(dbpath);
            db.get(statement, params, function (err, row) {
                row = mapping(row, type);
                if (callback)
                    callback(row);
            });
            db.close();
        },
        run: function (statement, params, callback) {
            const db = new sqlite.Database(dbpath);
            db.run(statement, params, function (err) {
                if (callback)
                    callback(err !== undefined);
            });
            db.close();
        }
      
    }
}