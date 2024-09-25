//CRUD


//import axios from 'axios';
const axios = require('axios');

//import fs from 'fs';
const fs = require('fs');

//import yargs from 'yargs';
 const yargs = require('yargs');
//npm i yargs

//import { hideBin } from 'yargs/helpers';  // Para manejar correctamente los argumentos
const { hideBin } = require('yargs/helpers');


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

const args = yargs
.command('create','Crear una nueva tarea', createConfig)
.command('read','Mostrar todas las tareas' )
.command('update','Actualizar o modificar una tarea',updateConfig )
.command('delete','Eliminar una tarea', deleteConfig)
.help()
.argv

