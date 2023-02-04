import {useState, useEffect} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        if(loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, initialCards]) => {
                setCards(initialCards);
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
        }
    }, [loggedIn]);

    function  handleEditAvatarClick()  {
        setIsEditAvatarPopupOpen(true);
    }
    
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
        setIsInfoTooltipOpen(false);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);      
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleUpdateUser(newUserData) {
        setIsLoading(true);
        api.setUserInfo(newUserData)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateAvatar(newUserData) {
        setIsLoading(true);
        api.setUserAvatar(newUserData)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleAddPlaceSubmit(card) {
        setIsLoading(true);
        api.addNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    
    function openInfoToolTip() {
        setIsInfoTooltipOpen(true);
    }

    // регистрация
    function handleRegistration(email, password) {
        setIsLoading(true);
        auth.register(email, password)
            .then(() => {
                setRegistrationSuccessful(true);
                openInfoToolTip();
            })
            .catch((err) => {
                console.log(err);
                setRegistrationSuccessful(false);
                openInfoToolTip();
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    //вход
    function handleAuthorization(email, password) {
        setIsLoading(true);
        auth.authorize(email, password)
            .then((res) => {
                if(res.token) {
                    localStorage.setItem('jwt', res.token);
                } 
                setLoggedIn(true);
                setUserEmail(email);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    //проверка токена
    function tokenCheck() {
        const token = localStorage.getItem('jwt');
        if(!token){
            return;
        }
        auth.getContent(token)
            .then((res)=>{
                setLoggedIn(true);
                setUserEmail(res.data.email);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        tokenCheck();
    }, []);

    //выход
    function handleSignOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
    }

    return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <Header 
                email={userEmail}
                onSignOut={handleSignOut}
            />
        
            <Switch>
                <Route path='/sign-in'>
                    <Login 
                        onLogin={handleAuthorization} 
                        loggedIn={loggedIn}
                        isLoading={isLoading}
                    />
                </Route>

                <Route path='/sign-up'>
                    <Register
                        onRegister={handleRegistration} 
                        registrationSuccessful={registrationSuccessful}
                        isLoading={isLoading}
                    />
                </Route>

                <ProtectedRoute 
                    path='/'
                    component={Main}
                    loggedIn={loggedIn}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
            </Switch>
            
            <Footer />
            
            <EditProfilePopup 
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isLoading={isLoading}
            />

            <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen} 
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading}
            />

            <AddPlacePopup 
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />

            <ImagePopup 
                card={selectedCard}
                onClose={closeAllPopups}
            />

            <InfoTooltip 
                onClose={closeAllPopups}
                isOpen={isInfoTooltipOpen}
                registrationSuccessful={registrationSuccessful}
            />
        </div>
    </CurrentUserContext.Provider>   
    );
}

export default App;