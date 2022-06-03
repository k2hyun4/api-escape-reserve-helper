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

app.post('/book-advice', (req, res) => {
	const bookInfo = calcModule.convertByDayjs(req.body);
	const bookableDateTime = calcModule.calcBookableDateTime(bookInfo);

	res.send(displayModule.makeResponse(bookableDateTime, bookInfo.now.year()));
});

app.listen(process.env.PORT || port, () => console.log('Server Start in ', port));
