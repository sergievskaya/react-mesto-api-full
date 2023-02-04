import {useRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

    const avatarRef = useRef();

    useEffect(() => {
        if(isOpen){
            avatarRef.current.value = '';
        }
    }, [isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      }

    return(
        <PopupWithForm 
            name='edit-avatar'
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={onClose}
            buttonText='Сохранить'
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <fieldset className="popup__fields">
                <div className= "popup__field">
                    <input 
                        name="avatar"
                        type="url"
                        id="avatar-input"
                        className="popup__input"
                        placeholder="Ссылка на картинку"
                        required
                        ref={avatarRef}
                    />
                    <span className="popup__input-error avatar-input-error"></span>
                </div>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;