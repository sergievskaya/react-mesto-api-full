import {useState, useEffect, useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {

    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // После загрузки текущего пользователя из API, его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]); 

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name,
          about: description,
        });
    }

    return(
        <PopupWithForm  
            name='edit-profile'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            buttonText='Сохранить'
            isLoading={isLoading}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__fields">
                <div className="popup__field">
                    <input 
                        name="name" 
                        type="text"
                        id="name-input" 
                        className="popup__input" 
                        placeholder="Имя" 
                        required 
                        minLength="2" 
                        maxLength="40"
                        value={name || ''}
                        onChange={handleNameChange}
                     />
                    <span className="popup__input-error name-input-error"></span>
                </div>
                <div className= "popup__field">
                    <input 
                        name="about" 
                        type="text" 
                        id="job-input" 
                        className="popup__input" 
                        placeholder="О себе" 
                        required 
                        minLength="2" 
                        maxLength="200"
                        value={description || ''}
                        onChange={handleDescriptionChange}
                    />
                    <span className="popup__input-error job-input-error"></span>
                </div>
            </fieldset>
        </PopupWithForm>
    );

}

export default EditProfilePopup;