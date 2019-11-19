//Endpoints de la DB o ficheros (para empezar)
//Añadir locales nuevos
//Mostrar los locales solicitales 
//Actualizar las características de los locales
//Eliminar locales? Depende

//PRIMERA PRUEBA: usando por defecto datos de locales. 
const locals = [{ name: 'Local Alfonso', id: 1, location: "C/ Teresa de los campos" }, { name: 'Local Gigants', id: 2, location: "C/ Pedro de Alonso" }];

function getLocals(){
    return locals;
}

function createLocals(newLocal) {
    newLocal.id = locals[locals.length - 1].id + 1;
    newLocal.likes = 0;
    locals.push(newLocal);
    return locals;
}

module.exports = { getLocals, createLocals};