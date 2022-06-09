const express = require('express');
const app = express();
const port = 3000;
const calcModule = require('./module/calc');
const displayModule = require('./module/display');
const kakaoChatbotModule = require('./module/kakao-chatbot');

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.post('/book-advice', (req, res) => {
	const parsedData = kakaoChatbotModule.parseRequestParamValue(req.body);
	const bookInfo = calcModule.convertByDayjs(parsedData);
	const now = calcModule.getNow();

	const bookableDateTime = calcModule.calcBookableDateTime(bookInfo, now);
	const responseMessage = displayModule.makeResponse(bookableDateTime, now.year());

	res.status(200).send(kakaoChatbotModule.responseCalcResult(responseMessage));
});

app.post('/check', (req, res) => {
	res.status(200).send(kakaoChatbotModule.responseCheck());
});




app.get('/', (req, res) => {
	res.send('Hello k2h!');
});

app.listen(process.env.PORT || port, () => console.log('Server Start in ', port));
