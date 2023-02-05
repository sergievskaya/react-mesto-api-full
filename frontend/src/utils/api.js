class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkStatus(res) {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Oшибка: ${res.status}`);
        }
    }

    getUserInfo() {
        //получить данные пользователя get
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then((res) => this._checkStatus(res));
    }

    getInitialCards() {
        // получить карточки get
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then((res) => this._checkStatus(res));
    }

    changeLikeCardStatus(cardId, isLiked) {
        // добавить или убрать лайк
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers
        })
          .then((res) => this._checkStatus(res));
    }

    deleteCard(cardId) {
        //удалить карточку delete
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
          .then((res) => this._checkStatus(res));
    }

    setUserInfo(data) {
        //заменить данные пользователя patch
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: data.name,
              about: data.about
            })
        })
            .then((res) => this._checkStatus(res));
    }

    setUserAvatar(data) {
        // заменить аватар patch
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              avatar: data.avatar,
            })
        })
            .then((res) => this._checkStatus(res));
    }

    addNewCard(data) {
        //добавить новую карточку post
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
              name: data.name,
              link: data.link
            })
        })
            .then((res) => this._checkStatus(res));
    }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-51',
    headers: {
      authorization: 'c178ff20-af0a-4e0f-9c0d-216464e441d9',
      'Content-Type': 'application/json'
    }
});

export default api;