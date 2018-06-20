import {
    addClass,
    removeClass,
    hasClass
} from './DOMUtils';

let _elemInput;
let _formConfig;

const cssClassPristine = 'is-pristine';
const cssClassDirty = 'is-dirty';
const cssClassValid = 'is-valid';
const cssClassInvalid = 'is-invalid';

function isInputRequired() {
    return _elemInput.hasAttribute('required');
}

function getInputType() {
    return _elemInput.getAttribute('type');
}

function bindInputBlurEvent() {
    _elemInput.addEventListener('blur', blurHandler, false);
}

function blurHandler(event) {
    var inputElement = event.target;
    var validityStatus = inputElement.validity;
    var inputIsValid = validityStatus.valid;

    if(hasClass(inputElement, cssClassPristine)) {
        removeClass(inputElement, cssClassPristine);
        addClass(inputElement, cssClassDirty);
    }

    if(hasClass(inputElement, cssClassDirty) && inputIsValid) {
        removeClass(inputElement, cssClassInvalid);
        addClass(inputElement, cssClassValid);
    } else {
        removeClass(inputElement, cssClassValid);
        addClass(inputElement, cssClassInvalid);
    }

    _formConfig.onInputBlur(inputElement, inputIsValid, validityStatus);
}

function setInitialInputClass() {
    addClass(_elemInput, cssClassPristine);
}

export default function inputManager(elemInput, formConfig) {
    _elemInput = elemInput;
    _formConfig = formConfig;

    setInitialInputClass();

    if(formConfig.validateOnFocusLoss === true) {
        bindInputBlurEvent();
    }

    return {
        element: elemInput,
        type: getInputType(),
        isRequired: isInputRequired()
    };
}