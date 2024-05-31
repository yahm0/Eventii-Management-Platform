import React from 'react'; // Import the React library
import ReactDOM from 'react-dom'; // Import the ReactDOM library
import './styles/main.css'; // Import the main.css file
import App from './App'; // Import the App component

// Render the App component to the root element in the DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
