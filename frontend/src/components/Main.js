import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";



function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__avatar-container">
                        <img className="profile__avatar-image" src={currentUser.avatar} alt="аватар пользователя" />
                        <button onClick={onEditAvatar} className="profile__avatar-button" type="button" aria-label="Изменить аватар профиля"></button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button onClick={onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать профиль"></button>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={onAddPlace} className="profile__add-button" type="button" aria-label="Добавить новую карточку"></button>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card 
                            key={card._id} 
                            card={card} 
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;