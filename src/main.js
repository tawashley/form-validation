import './polyfill.objectAssign';
import './polyfill.validityState';

import formManager from './form';

let forms = [];

let defaultConfig = {
    form: null,
    validateOnFocusLoss: false,
    onInputBlur: function() {},
    formSubmitHandler: function() {}
}

function addForm(config) {
    config = Object.assign(defaultConfig, config);

    forms.push(formManager(config));
}

function getForms() {
    console.log('forms', forms);
    return forms;
}

window.formValidator = {
    addForm,
    getForms
}
