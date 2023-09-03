class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  
  __checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  getUserInfo() {
    const token = localStorage.getItem('jwt');
    const url = `${this._baseUrl}/users/me`;
  
    const requestOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  
    return fetch(url, requestOptions)
      .then(this.__checkResponse);
  }
  
  saveNewUserInfo(userInformation) {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInformation)
    };
  
    return fetch(`${this._baseUrl}/users/me`, requestOptions)
      .then(this.__checkResponse);
  }
  
  saveMovies(movie) {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameEN: movie.nameEN,
        nameRU: movie.nameRU,
      })
    };
  
    return fetch(`${this._baseUrl}/movies`, requestOptions)
      .then(this.__checkResponse);
  }
  
  getSavedMovies() {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  
    return fetch(`${this._baseUrl}/movies`, requestOptions)
      .then(this.__checkResponse);
  }
  
  deleteMovies(movieId) {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  
    return fetch(`${this._baseUrl}/movies/${movieId}`, requestOptions)
      .then(this.__checkResponse);
  }
  }
  
  export const api = new Api({
   baseUrl: 'https://savelii.sporyshev.nomoredomains.rocks',
  });