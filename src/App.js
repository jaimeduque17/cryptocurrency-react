import React, { useState, useEffect } from 'react';
import axios from 'axios';

import image from './cryptocurrency.png';

import Form from './components/Form';
import Quotation from './components/Quotation';
import Spinner from './components/Spinner';

function App() {

	const [currency, saveCurrency] = useState('');
	const [cryptocurrency, saveCryptocurrency] = useState('');
	const [loading, saveLoading] = useState(false);
	const [result, saveResult] = useState({});

	useEffect(() => {
		const quoteCryptocurrency = async () => {

			// if there is no currency, don't execute
			if (currency === '') return;

			const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;
			
			const result = await axios.get(url);

			// mostrar spinner
			saveLoading(true);

			// ocultar spinner and add the result
			setTimeout(() => {
				saveLoading(false);
				saveResult(result.data.DISPLAY[cryptocurrency][currency]);
			}, 3000);
		}

		quoteCryptocurrency();
	}, [currency, cryptocurrency]);

	// show spinner or result
	const component = (loading) ? <Spinner /> : <Quotation result={result}/>;

	return (
		<div className="container">
			<div className="row">
				<div className="one-half column">
					<img src={image} alt="cryptocurrency image" className="logo" />
				</div>
				<div className="one-half column">
					<h1>Quotes cryptocurrencies instantly</h1>
					<Form
						saveCurrency={saveCurrency}
						saveCryptocurrency={saveCryptocurrency}
					/>
					{component}
				</div>
			</div>
		</div>
	);
}

export default App;
