import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fetch from 'node-fetch';

import Html from './components/Html';
import App from './components/App';

const app = express();

app.use(express.static(path.join(__dirname)));

app.get('/search-location-weather', (req, res) => {
	const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?id=5391811';
	const apiId = '&appid=13fdb39fa4267ca2300edbfdd1e93501&units=imperial';
	const userLocation = (url1, url2) => {
		let newUrl = url1 + url2;
		return newUrl;
	};

	const apiUrl = userLocation(baseUrl, apiId);

	fetch(apiUrl)
		.then(res => res.json())
		.then(data => {
			res.send({ data });
		})
		.catch(err => {
			res.redirect('/error');
		});

})


app.get('*', async (req, res) => {
	const scripts = ['vendor.js', 'client.js'];
	const appMarkup = ReactDOMServer.renderToString(
		<App />
	);
	const html = ReactDOMServer.renderToStaticMarkup(
		<Html
			children={appMarkup}
			scripts={scripts}
		/>
	);

	res.send(`<!doctype html>${html}`);
});

app.listen(3000, () => console.log('Listening on localhost:3000'));
