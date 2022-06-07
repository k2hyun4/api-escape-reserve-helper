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
	console.log('raw bookInfo: ', req.body.action.params);
	const bookInfo = calcModule.convertByDayjs(req.body.action.params);
	console.log('converted: ', bookInfo);
	const now = calcModule.getNowKst();
	console.log('now: ', now);

	const bookableDateTime = calcModule.calcBookableDateTime(bookInfo, now);
	console.log('calc result: ', bookableDateTime);
	const responseMessage = displayModule.makeResponse(bookableDateTime, now.year());
	console.log('response message: ', responseMessage);
	
	res.status(200).send(displayModule.wrapByChatBotSimpleTextFormat(responseMessage));
});

app.get('/now', (req, res) => {
	res.send(calcModule.getNowKst().format('YYYY-MM-DDTHH:mm:ss'));
});

app.listen(process.env.PORT || port, () => console.log('Server Start in ', port));
