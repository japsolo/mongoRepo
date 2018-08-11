const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.listen(5000, () => console.log('Listen port: 5000'));

// Connect se conecta a la bd
mongoose.connect('mongodb://localhost/testDB');

app.use('/assets/', express.static(__dirname + '/../public/'));

app.set('view engine', 'ejs');
app.set('views', './src/templates');

let studentModel = new mongoose.Schema({	
	name: String,
	lastName: String,
	age: Number
}, { versionKey: false });

const Alumno = mongoose.model('student', studentModel);

app.get('/', (req, res) => {
	// El find siempre retorna un ARRAY
	// Alumno.find(loquebuscas, callback(error, elResultadelabusqueda));
	Alumno.find({}, (error, result) => {
		if (error) console.log(error);
		else {
			res.render('index', { listaEstudiantes: result });
		}
	})
})

app.post('/registro', urlEncodedParser, (req, res) => {
	Alumno.create(req.body, (error, result) => {
		if (error) console.log(error);
		else console.log(result);
	})
	res.redirect('/');
})