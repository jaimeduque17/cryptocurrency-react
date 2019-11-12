import React from 'react';

import image from './cryptocurrency.png';

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={image} alt="cryptocurrency image" className="logo" />
        </div>
        <h1>Cryptocurrency App</h1>
      </div>
    </div>
  );
}

export default App;
