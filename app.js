const express = require('express');
const app = express();
const port = 3000;
const calcModule = require('./module/calc')

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.get('/', (req, res) => {
	res.send('Hello k2h!');
});

app.post('/book-advice', (req, res) => {
	res.send(calcModule.getBookAdvice(req.body));
});

app.listen(process.env.PORT || port, () => console.log('Server Start in ', port));
