const express = require('express');
const app = express();
const port = 3000;
const calcModule = require('./module/calc')
const displayModule = require('./module/display')

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.get('/', (req, res) => {
	res.send('Hello k2h!');
});

app.post('/', (req, res) => {
	res.status(200).send({
		a: 1,
		b: '2'
	});
});

app.post('/book-advice', (req, res) => {
	const bookInfo = calcModule.convertByDayjs(req.body);
	const now = calcModule.getNowKst();
	const bookableDateTime = calcModule.calcBookableDateTime(bookInfo, now);

	res.send(displayModule.makeResponse(bookableDateTime, now.year()));
});

app.get('/now', (req, res) => {
	res.send(calcModule.getNowKst().format('YYYY-MM-DDTHH:mm:ss'));
});

app.listen(process.env.PORT || port, () => console.log('Server Start in ', port));
