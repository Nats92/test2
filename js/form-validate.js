"use strict";
(function() {

var validities = [];
var Validation = function (field, length){
    this.errors = [];
    this.field = field;
    this.length = length;
};

Validation.prototype = {
    stopSubmit: function() {
        if (this.errors.length > 0) {
            validities.push("invalid");
        }
    },
    colorizeValid: function () {
        this.field.classList.remove("modal-feedback__invalid-field");
    },
    colorizeInvalid: function () {
        this.field.classList.add("modal-feedback__invalid-field");
    },
    cleanErrorMessage: function() {
        var fieldID = this.field.id;
        var children = contactForm.querySelectorAll("#" + fieldID + "+ p");

        Array.prototype.slice.call(children).forEach(function(child) {
            child.textContent = "";
        });
    },
    setErrorMessage: function() {
        this.cleanErrorMessage();
        var placeForError = contactForm.querySelector("#" + this.field.id + "+ p");

        if (this.errors.length > 0) {
            var message = this.errors;
            var fragment = document.createDocumentFragment();

            message.forEach(function (el) {
                var p = document.createElement("p");
                p.classList.add("modal-feedback__error");
                p.innerHTML = "*" + el;
                fragment.appendChild(p);
            });

            placeForError.appendChild(fragment);
        }
    },
    checkIfEmpty: function() {
        if ((this.field.value === "") || (this.field.value.match(/^\s/))) {
            this.errors.push("Поле не может быть пустым или начинаться с пробелов!");
            return true;
        }
    },
    checkIfTooShort: function () {
        if (this.field.value.length < this.length) {
            this.errors.push("Поле не может быть короче " + this.length +" символов");
            return true;
        }
    },
    checkPhonePattern: function () {
        if (!(this.field.value.match(/((\+?7\s?\(?(9\d{2}|343)\)?)\s?\d{3}-?\s?\d{2}(-?\s?)\d{2})|((8\s?\(?(9\d{2}|343)\)?)\s?\d{3}-?\s?\d{2}(-?\s?)\d{2})/))) {
            this.errors.push("Номер телефона должен начинаться с +79 или 89 или +7(343) или 8(343)");
            return true;
        }
    },
    checkMailPattern: function () {
        if (!(this.field.value.match(/\w+@\w+/))) {
            this.errors.push("Адрес эл. почты должен состоять из латинских букв и символа @ образец: example@mail.ru");
            return true;
        }
    },
    checkMessagePattern: function () {
        if (this.field.value.match(/<|>|\/|\\|<a>|<\/a>|<img>|\|/)) {
            this.errors.push("Поле Сообщение не может содержать символы < > \\ / |, а также теги html-разметки");
            return true;
        }
    },
    checkName: function () {
        var empty = this.checkIfEmpty(this.field);
        var short = this.checkIfTooShort(this.field, this.length);

        if (empty || short) {
            this.setErrorMessage();
            this.colorizeInvalid();
        } else {
            this.colorizeValid();
            this.cleanErrorMessage();
        }
    },
    checkPhone: function () {
        var empty = this.checkIfEmpty(this.field);
        var matchPattern = this.checkPhonePattern(this.field);
        var short = this.checkIfTooShort(this.field, this.length);

        if(empty || matchPattern || short) {
            this.setErrorMessage();
            this.colorizeInvalid();
        } else {
            this.colorizeValid();
            this.cleanErrorMessage();
        }
    },
    checkMail: function () {
        var empty = this.checkIfEmpty(this.field);
        var valid = this.checkMailPattern();

        if (empty || valid) {
            this.setErrorMessage();
            this.colorizeInvalid();
        } else {
            this.colorizeValid();
            this.cleanErrorMessage();
        }
    },
    checkMessage: function () {
        var matchPattern = this.checkMessagePattern(this.field);
        var empty = this.checkIfEmpty(this.field);
        var short = this.checkIfTooShort(this.field, this.length);
        if (matchPattern || empty || short) {
            this.setErrorMessage();
            this.colorizeInvalid();
        } else {
            this.colorizeValid();
            this.cleanErrorMessage();
        }
    }
};

var contactForm = document.querySelector(".modal-feedback__form"); // непосредственно сама форма
var submit = contactForm.querySelector(".modal-feedback__form-submit");
var form = document.querySelector(".modal-feedback"); // обёртка формы

var formFields = {
    phoneField: contactForm.querySelector("input#feedback-tel"),
    messageField: contactForm.querySelector("textarea#feedback-message"),
    nameField: contactForm.querySelector("input#feedback-name"),
    mailField: contactForm.querySelector("input#feedback-mail"),
    spamCheckField: contactForm.querySelector("input#phone-check")
};

function onValidate () {
    var name = new Validation(formFields.nameField, 3);
        name.checkName();
    var phone = new Validation(formFields.phoneField, 11);
        phone.checkPhone();
    var mail = new Validation(formFields.mailField);
        mail.checkMail();
    var message = new Validation(formFields.messageField, 15);
        message.checkMessage();
}

function addHandlers () {
    contactForm.addEventListener("input", onValidate);
    submit.addEventListener("click", function(evt) {
        var name = new Validation(formFields.nameField, 3);
        name.checkName();
        name.stopSubmit();

        var phone = new Validation(formFields.phoneField, 11);
        phone.checkPhone();
        phone.stopSubmit();

        var mail = new Validation(formFields.mailField);
        mail.checkMail();
        mail.stopSubmit();

        var message = new Validation(formFields.messageField, 15);
        message.checkMessage();
        message.stopSubmit();

        if (validities.length === 0 && formFields.spamCheckField.value === "") {
            contactForm.submit();
        } else {
            evt.preventDefault();        
        }
    validities = [];
    });

    var closeForm = document.querySelector(".modal-feedback__form-close");
    closeForm.addEventListener("click", function() {
        var name = new Validation(formFields.nameField, 3);
        name.cleanErrorMessage();
        name.colorizeValid();

        var phone = new Validation(formFields.phoneField, 11);
        phone.cleanErrorMessage();
        phone.colorizeValid();

        var mail = new Validation(formFields.mailField);
        mail.cleanErrorMessage();
        mail.colorizeValid();

        var message = new Validation(formFields.messageField, 15);
        message.cleanErrorMessage();
        message.colorizeValid();
    })
}

addHandlers();

})();


