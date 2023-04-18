import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import App from './components/App';

console.log("app start")


if (window.localStorage.getItem('token') === null) {
    console.log("login");
    const xhr = new XMLHttpRequest();
    console.log("login");
    xhr.open('POST', 'https://write-api-discord.ismkdc.com/write-api/sessions/create', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(null);

    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        window.localStorage.setItem('token', JSON.stringify(data.token));
        window.localStorage.setItem('user', JSON.stringify(data.user));
        console.log("login", data);
    } else {
        console.error('Error retrieving token:', xhr.statusText);
    }
}



ReactDOM.render(<App />, document.getElementById('root'));
