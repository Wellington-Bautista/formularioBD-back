const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'https://wellington-bautista.github.io/formulario-con-bd/', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],    
    allowedHeaders: ['Content-Type', 'Authorization'] 
  };
app.use(cors(corsOptions));
app.use(express.json());
const conexion = mysql.createConnection({
    host: 'bbzrf5q87m4yyw8ehakr-mysql.services.clever-cloud.com',
    user: 'ubprbfkvagtft4ql',
    password: 'Q2vYpKmKUyOMnMmr83Ip',
    database: 'bbzrf5q87m4yyw8ehakr',
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

conexion.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
})

//Consulta de estudiante
app.get("/consulta", (req, res) => {
    const matricula = req.query.matricula;
    conexion.query(`SELECT * FROM estudiante WHERE matricula="${matricula}"`, (err, rows, fields) => {
        if (err) throw err;
        res.send(JSON.stringify(rows[0]));
    })
})
//Registrar estudiante
app.post("/registro", (req, res) => {
    const cuerpoPeticion = req.body;
    const query = ` INSERT INTO estudiante () VALUES (?, ?, ?, ?, ?, ?)`;
    const valores = [
        cuerpoPeticion.nombre,
        cuerpoPeticion.matricula,
        cuerpoPeticion.promedio,
        cuerpoPeticion.carrera,
        cuerpoPeticion.telefono,
        cuerpoPeticion.direccion,
    ];
    conexion.query(query,valores,(err,rows,fields)=>{
        if(err){
            return res.status(500).send({ mensaje: "Error en el servidor" });
        }
        res.status(200).send({mensaje: "Estudiante registrado correctamente"});
    })
})
//Actualizar datos de estudiante
app.put('/actualizar',(req,res)=>{
    const cuerpoPeticion=req.body;
    const query = `update estudiante set nombre = ?, promedio = ?, carrera = ?, telefono = ?, direccion = ? where matricula= ?`;
    const valores = [
        cuerpoPeticion.nombre,
        cuerpoPeticion.promedio,
        cuerpoPeticion.carrera,
        cuerpoPeticion.telefono,
        cuerpoPeticion.direccion,
        cuerpoPeticion.matricula,
    ];
    conexion.query(query,valores,(err,rows,fields)=>{
        if(err) throw err;
        res.send("Datos actualizados correctamente");
    })
})
//Eliminar estudiante
app.delete('/borrar',(req,res)=>{
    const {matricula}=req.query;
    const query= `delete from estudiante where matricula = ?`;
    const valores=[matricula];
    conexion.query(query,valores,(err,rows,fields)=>{
        if(err){
            return res.status(500).send({ mensaje: "Error en el servidor" });
        }
        res.status(200).send({
            mensaje: "Estudiante eliminado correctamente"
        });
    })    
})
