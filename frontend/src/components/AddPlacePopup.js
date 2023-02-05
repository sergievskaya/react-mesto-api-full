import {useRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

    const nameRef = useRef();
    const linkRef = useRef();

    useEffect(() => {
        if(isOpen){
            nameRef.current.value = '';
            linkRef.current.value = '';
        }
    }, [isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value,
        });
    }

    return(
        <PopupWithForm 
            name='add-place'
            title='Новое место'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText='Создать'
            isLoading={isLoading}
        >
            <fieldset className="popup__fields">
                <div className="popup__field">
                    <input
                        name="name"
                        type="text"
                        id="title-input"
                        className="popup__input"
                        placeholder="Название"
                        required 
                        minLength="2"
                        maxLength="30"
                        ref={nameRef}
                    />
                    <span className="popup__input-error title-input-error"></span>
                </div>
                <div className= "popup__field">
                    <input
                        name="link"
                        type="url"
                        id="link-input"
                        className="popup__input"
                        placeholder="Ссылка на картинку"
                        required
                        ref={linkRef}
                    />
                    <span className="popup__input-error link-input-error"></span>
                </div>
            </fieldset>
        </PopupWithForm>
    );
}

export default AddPlacePopup;