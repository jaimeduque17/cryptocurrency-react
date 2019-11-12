import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cryptocurrency from './Cryptocurrency';
import Error from './Error';

function Form({ saveCurrency, saveCryptocurrency }) {

    const [cryptocurrencies, saveCryptocurrencies] = useState([]);
    const [quoteCurrency, saveQuoteCurrency] = useState('');
    const [quoteCrypto, saveQuoteCrypto] = useState('');
    const [error, saveError] = useState(false);

    useEffect(() => {

        const consultAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const result = await axios.get(url);

            // put response in the state
            saveCryptocurrencies(result.data.Data);
        }
        consultAPI();
    }, []);

    // validate that user fill out both fields
    const currencyQuote = (e) => {
        e.preventDefault();

        // validate if both fields are fill out
        if (quoteCurrency === '' || quoteCrypto === '') {
            saveError(true);
            return;
        }

        // pass data to the main component
        saveError(false);
        saveCurrency(quoteCurrency);
        saveCryptocurrency(quoteCrypto);
    }

    // show error if exist
    const component = (error) ? <Error message="Both fields are mandatory" /> : null;

    return (
        <form
            onSubmit={currencyQuote}
        >
            {component}
            <div className="row">
                <label>Choose your Currency</label>
                <select
                    className="u-full-width"
                    onChange={(e) => saveQuoteCurrency(e.target.value)}
                >
                    <option value="">- Choose your Currency -</option>
                    <option value="USD">American Dollar</option>
                    <option value="GBP">Pounds</option>
                    <option value="EUR">Euro</option>
                    <option value="COP">Peso Colombiano</option>
                </select>
            </div>
            <div className="row">
                <label>Choose your Cryptocurrency</label>
                <select
                    className="u-full-width"
                    onChange={e => saveQuoteCrypto(e.target.value)}
                >
                    <option value="">- Choose your Cryptocurrency -</option>
                    {cryptocurrencies.map(cryptocurrency => (
                        <Cryptocurrency
                            key={cryptocurrency.CoinInfo.Id}
                            cryptocurrency={cryptocurrency}
                        />
                    ))}
                </select>
            </div>
            <input type="submit" className="button-primary u-full-width" value="Calculate" />
        </form>
    );
}

export default Form;