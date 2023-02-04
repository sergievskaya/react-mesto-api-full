import React from "react";

function PopupWithForm({name, title, children, isOpen, onClose, buttonText, onSubmit, isLoading}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть"></button>
                <form name={name} className="popup__form" onSubmit={onSubmit}>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className="popup__submit-button" type="submit">{isLoading ? 'Сохранение...' : buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;