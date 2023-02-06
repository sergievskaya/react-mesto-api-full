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
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => this._checkStatus(res));
    }

    getInitialCards() {
        // получить карточки get
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => this._checkStatus(res));
    }

    changeLikeCardStatus(cardId, isLiked) {
        // добавить или убрать лайк
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
          .then((res) => this._checkStatus(res));
    }

    deleteCard(cardId) {
        //удалить карточку delete
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
          .then((res) => this._checkStatus(res));
    }

    setUserInfo(data) {
        //заменить данные пользователя patch
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: data.name,
              about: data.about
            })
        })
            .then((res) => this._checkStatus(res));
    }

    setUserAvatar(data) {
        // заменить аватар patch
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              avatar: data.avatar,
            })
        })
            .then((res) => this._checkStatus(res));
    }

    addNewCard(data) {
        //добавить новую карточку post
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: data.name,
              link: data.link
            })
        })
            .then((res) => this._checkStatus(res));
    }

}

const api = new Api({
    baseUrl: 'https://api.mesto.sergievskaya.nomoredomainsclub.ru',
});

export default api;