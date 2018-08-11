const express = require('express');
const faker = require('faker');

const app = express();

app.listen(5000, () => console.log('Listen port: 5000'));

app.use('/assets/', express.static(__dirname + '/../public/'));

app.set('view engine', 'ejs');
app.set('views', './src/templates');

let myStudentsDB = [];

for (let i = 1; i <= 10; i++) {
	myStudentsDB.push({
		id: i,
		studentName: faker.name.firstName(),
		studentLastName: faker.name.lastName(),
		studentAvatar: faker.internet.avatar(),
		studentProfile: faker.lorem.paragraph()
	});
}

app.get('/', (req, res) => {
	res.render('index', {
		personaASaludar: null
	});
});

app.get('/saludar/:person', (req, res) => {
	res.render('index', {
		personaASaludar: req.params.person
	});
});

app.get('/students', (req, res) => {
	res.render('students', {
		studentsArray: myStudentsDB
	});
})

app.get('/detail/:id', (req, res) => {
	let elID = req.params.id;

	let elEstudianteQueMePiden = myStudentsDB[elID - 1];

	if (elID > myStudentsDB.length) res.render('404');
	else res.render('profile', { student: elEstudianteQueMePiden });
})

app.use((req, res, next) => {
	res.status(400).render('404');
});

console.log(myStudentsDB);
