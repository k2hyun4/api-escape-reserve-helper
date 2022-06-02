const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello k2h!');
});

app.get('/test', (req, res) => {
	const {a, b} = req.query;
	const numberA = Number(a);
	const numberB = Number(b);

	res.json({
		a: numberA,
		b: numberB,
		sum: numberA + numberB
	});
});

app.listen(process.env.PORT || port, () => console.log('Server Start in ', port));
