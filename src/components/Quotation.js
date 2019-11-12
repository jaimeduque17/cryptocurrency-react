import React from 'react';

function Quotation({ result }) {

    if (Object.keys(result).length === 0) return null;

    return (
        <div className="result">
            <h2>Result</h2>
            <p className="price">The price is: <span>{result.PRICE}</span></p>
            <p>Highest price of the day: <span>{result.HIGHDAY}</span></p>
            <p>Lowest price of the day: <span>{result.LOWDAY}</span></p>
            <p>Variation last 24 hours: <span>{result.CHANGEPCT24HOUR}%</span></p>
            <p>Last update: <span>{result.LASTUPDATE}</span></p>
        </div>
    );
}

export default Quotation;