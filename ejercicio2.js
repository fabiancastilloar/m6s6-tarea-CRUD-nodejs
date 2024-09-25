 
//import fs from 'fs';
//const fs = require('fs');
const fs = require('fs').promises; // Usa fs.promises para poder trabajar con async/await

//import yargs from 'yargs';
 const yargs = require('yargs');
//npm i yargs

const { v4: uuidv4 } = require('uuid');



//import { hideBin } from 'yargs/helpers';  // Para manejar correctamente los argumentos
const { hideBin } = require('yargs/helpers');
const { argv } = require('process');


const createConfig ={
    titulo:{
        describe:'El nombre de tarea a realizar',
        alias: 't',
        demandOption :true
    },
    contenido:{
        describe:'Descripcion de tarea a realizar',
        alias: 'c',
        demandOption :true
    },
}
 

const updateConfig ={
    titulo: {
        describe: 'Nuevo nombre de la tarea a realizar',
        alias: 't',
    },
    contenido:{
        describe:'Nueva Descripcion de la tarea a realizar',
        alias: 'c',
    },
    id:{
        describe: 'El id de la tarea a actualizr o modificar',
        alias: 'i',
        demandOption :true
    }
}

//Pasamos el objeto de configuración, como tercer argumento del tercer método command().



const deleteConfig = {
    id:{
        describe:'El ID i identificador de la tarea a eliminar',
        alias: 'i',
        demandOption :true  
    }
}


/*
const funcionCreate = async ({titulo,contenido}) => {
    const id = uuidv4().slice(0,8);
    console.log(id );
  //  const titulo = argv.titulo;
  //  const contenido = argv.contenido;
  const nuevaTarea ={id:id, titulo:titulo, contenido:contenido};

 let tareas = await fs.readFile('tareas.txt');

  if(tareas.trim()== ""){
    return [];
} else{
    //return JSON.parse(tareas);
    const arrayTareas = JSON.parse(tareas);

    arrayTareas.push(nuevaTarea);
  
    await fs.writeFile('tareas.txt',JSON.stringify( arrayTareas, null, 2));
    console.log('Nueva tarea agregada');
}


};
*/

const funcionCreate = async ({ titulo, contenido }) => {
    const id = uuidv4().slice(0, 8);
    const nuevaTarea = { id: id, titulo: titulo, contenido: contenido };

    try {
        // Intenta leer el archivo
        let tareas = await fs.readFile('tareas.txt', 'utf-8');

        // Si el archivo está vacío o no existe, inicializa un array vacío 
        let arrayTareas;
        if (tareas.trim() !== "") {
            arrayTareas = JSON.parse(tareas);
        } else {
            arrayTareas = [];
        }

        // Agrega la nueva tarea al array
        arrayTareas.push(nuevaTarea);

        // Escribe el array de nuevo en el archivo
        await fs.writeFile('tareas.txt', JSON.stringify(arrayTareas, null, 2));
        console.log('Nueva tarea agregada');
    } catch (error) {
        console.error('Error al manejar el archivo:', error.message);
    }
};

 /*
const funcionRead = async () => {
const tareasArchivo = fs.readFile('tareas.txt');
const arrayTareas = JSON.parse(tareasArchivo);

console.log(arrayTareas);
}
*/

const funcionRead = async () => {
    try {
        // obtener el contenido del archivo
        const tareasArchivo = await fs.readFile('tareas.txt', 'utf-8');

        // Verifica si el archivo está vacío antes de parsear
        let arrayTareas;
        if (tareasArchivo.trim() !== "") {
            arrayTareas = JSON.parse(tareasArchivo);
        } else {
            arrayTareas = [];
        }

        let contador =0;
       // console.log(arrayTareas);

        for(tareas of arrayTareas){
const{titulo,contenido,id} = tareas;
contador++;
console.log(`Tarea numero ${contador}:`);
console.log(`- Titulo: ${titulo}:`);
console.log(`- Contenido: ${contenido}:`);
console.log(`- Id ${id}:`);
console.log(``);
        }


    } catch (error) {
        console.error('Error al leer el archivo:', error.message);
    }
}

/*
const funcionUpdate = async ({id,titulo,contenido}) => {
    try {
        // obtener el contenido del archivo
        const tareasArchivo = await fs.readFile('tareas.txt', 'utf-8');

        // Verifica si el archivo está vacío antes de parsear
        let arrayTareas;
        if (tareasArchivo.trim() !== "") {
            arrayTareas = JSON.parse(tareasArchivo);
        } else {
            arrayTareas = [];
        }

        const tareaActual = arrayTareas.findIndex(tarea => tarea.id === id);

        const tituloNuevo = titulo ? titulo : tareaActual.titulo;

        const contenidoNuevo = contenido ? contenido : tareaActual.contenido;

        arrayTareas[tareaActual].titulo = tituloNuevo;

        arrayTareas[tareaActual].contenido = contenidoNuevo;  
        
        await fs.writeFile('tareas.txt', JSON.stringify(arrayTareas, null, 2));

        console.log("Tu tarea ha sido actualizada");

    } catch (error) {
        console.error('Error al leer el archivo:', error.message);
    }
}
*/
 

const funcionUpdate = async ({id, titulo, contenido}) => {
    try {
        // obtener el contenido del archivo
        const tareasArchivo = await fs.readFile('tareas.txt', 'utf-8');

        // Verifica si el archivo está vacío antes de parsear
        let arrayTareas = tareasArchivo.trim() ? JSON.parse(tareasArchivo) : [];

        const tareaIndex = arrayTareas.findIndex(tarea => tarea.id === id);

        if (tareaIndex === -1) {
            console.log(`No se encontró la tarea con ID: ${id}`);
            return;
        }

        // Obtiene la tarea actual
        const tareaActual = arrayTareas[tareaIndex];

        // Actualiza título y contenido
        arrayTareas[tareaIndex].titulo = titulo || tareaActual.titulo;
        arrayTareas[tareaIndex].contenido = contenido || tareaActual.contenido;  
        
        // Guarda los cambios
        await fs.writeFile('tareas.txt', JSON.stringify(arrayTareas, null, 2));

        console.log("Tu tarea ha sido actualizada");

    } catch (error) {
        console.error('Error al leer el archivo:', error.message);
    }
};

/*
const funcionDelete = async ({id}) => {
    const tareasArchivo = await fs.readFile('tareas.txt');
    const arrayTareas = JSON.parse(tareasArchivo);
    console.log(id);

    
// Para eliminar el objeto con el id recibido, utilizaremos el método filter, 
// el cual devuelve todos los objetos que cumplan con la condición entregada. 
// Por lo tanto, filtraremos las tareas, buscando todas aquellas en donde el id 
// no sea igual al que se entregó.
   
    const nuevasTareas = arrayTareas.filter(tareas => tareas.id !== id);

    await fs.writeFile('tareas.txt', JSON.stringify(nuevasTareas, null, 2));

    console.log("La tarea ha sido eliminada exitosamente");
}
*/


 
const funcionDelete = async ({id}) => {
    try {
        const tareasArchivo = await fs.readFile('tareas.txt', 'utf-8');
        const arrayTareas = JSON.parse(tareasArchivo);

        // Verifica si la tarea existe
        const tareaIndex = arrayTareas.findIndex(tarea => tarea.id === id);

        if (tareaIndex === -1) {
            console.log(`No se encontró la tarea con ID: ${id}`);
            return;
        }

        // Filtra las tareas para eliminar la que coincide con el ID
        const nuevasTareas = arrayTareas.filter(tarea => tarea.id !== id);

        await fs.writeFile('tareas.txt', JSON.stringify(nuevasTareas, null, 2));

        console.log("La tarea ha sido eliminada exitosamente");
    } catch (error) {
        console.error('Error al leer el archivo:', error.message);
    }
};


const args = yargs
.command('create','Crear una nueva tarea', createConfig, (argv) => funcionCreate(argv))
.command('read','Mostrar todas las tareas',{},(argv) => funcionRead() )
.command('update','Actualizar o modificar una tarea',updateConfig, (argv) => funcionUpdate(argv) )
.command('delete','Eliminar una tarea', deleteConfig, (argv) => funcionDelete (argv))
.help()
.argv
 


//npm install uuid

// Generar un UUID
//const nuevoId = uuidv4();
//funcionCreate();

//podemos utilizar Destructuring en la definición de parámetros de la función.
 
//node ejercicio2.js read
//node ejercicio2.js create --t "nueva tarea" --c "Esta es una nueva tarea"
//node ejercicio2.js update -i=0fab140f -c="Estudiando JS del lado del cliente, utilizando frameworks"
//node ejercicio2.js update -i=0fab140f -c="Estudiando JS del lado del cliente, utilizando frameworks" -t=nuevoTITULO
//node ejercicio2.js delete --id="2e8ec63c"