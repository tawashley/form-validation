import {
    addClass,
    removeClass,
    hasClass,
    getClosestElement
} from './DOMUtils';

export default function inputManager(inputElement, formConfig) {
    const cssClassPristine = 'is-pristine';
    const cssClassDirty = 'is-dirty';
    const cssClassValid = 'is-valid';
    const cssClassInvalid = 'is-invalid';

    function isInputValid() {
        return inputElement.validity.valid;
    }

    function inputValidityStatus() {
        return inputElement.validity;
    }

    function setInputValidityStatus(element = inputElement) {
        if (isInputValid()) {
            removeClass(element, cssClassInvalid);
            addClass(element, cssClassValid);
        } else {
            removeClass(element, cssClassValid);
            addClass(element, cssClassInvalid);
        }
    }

    function setInputAsDirty() {
        removeClass(inputElement, cssClassPristine);
        addClass(inputElement, cssClassDirty);
    }

    function setInputStatusClass() {
        addClass(inputElement, cssClassPristine);
    }

    function validateInputStatus() {
        if (hasClass(inputElement, cssClassPristine)) {
            setInputAsDirty();
        }

        setInputValidityStatus();

        if (formConfig.inputParentSelector !== null && formConfig.inputParentSelector !== '') {
            const inputRowElement = getClosestElement(inputElement, formConfig.inputParentSelector);

            setInputValidityStatus(inputRowElement);
        }
    }

    function blurHandler() {
        validateInputStatus();

        formConfig.onInputBlur(inputElement, isInputValid(inputElement), inputValidityStatus(inputElement));
    }

    function bindInputBlurEvent() {
        inputElement.addEventListener('blur', blurHandler, false);
    }

    function init() {
        setInputStatusClass();

        if (formConfig.validateOn.blur) {
            bindInputBlurEvent();
        }
    }

    init();

    return {
        element: inputElement,
        validate: validateInputStatus
    };
}
