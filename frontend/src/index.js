import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import App from './components/App';

console.log("app start")

if (window.localStorage.getItem('token') !== null) {
    const token = JSON.parse(window.localStorage.getItem('token'));

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://read-api-discord.ismkdc.com/read-api/sessions/me', false);
    xhr.setRequestHeader('Authentication', token);
    xhr.send(null);
    
    if (xhr.status === 401) {
        console.error('Unauthorized:', xhr.statusText);
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
    }
}


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
