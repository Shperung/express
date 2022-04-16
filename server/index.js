import express from "express";
const app = express();

const port = process.env.PORT || 3001;

app.get('/express/', (req, res) => {
	res.send('<h1>Hello Express.</h1>');
});

app.listen(port, () => {
  console.log(`API starded in http://localhost:${port}/ .......`);
});