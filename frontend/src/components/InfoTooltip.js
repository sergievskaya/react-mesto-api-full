import successfullyIcon from '../images/successfully.svg';
import failIcon from '../images/fail.svg';

function InfoTooltip ({onClose, isOpen, registrationSuccessful}) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть"></button>
                <img 
                    className='popup__icon' 
                    src={registrationSuccessful ? successfullyIcon : failIcon } 
                    alt="картинка статуса регистрации"
                />
                <h2 className='popup__text'>
                    {registrationSuccessful ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }
                </h2>
            </div>
        </div>
    )
}

export default InfoTooltip;