import i18next from "i18next";
import general from "../../../utils/general";

const isExisty = function (value: any) {
    return value !== null && value !== undefined;
};

const isEmpty = function (value: any) {
    if (value instanceof Array) {
        return value.length === 0;
    }
    return value === '' || !isExisty(value);
};

const isEmptyTrimed = function (value: any) {
    if (typeof value === 'string') {
        return value.trim() === '';
    }
    return true;
};

const validations = {
    matchRegexp: (value: any, regexp: any) => {
        const validationRegexp = (regexp instanceof RegExp ? regexp : (new RegExp(regexp)));
        return (isEmpty(value) || validationRegexp.test(value));
    },
    isNameSurname: (value: any) => {
        // const split = value?.split(" ");
        // const lastVal = split[split?.length - 1];
        // && !general.isNullOrEmpty(lastVal?.replace(/\s/g, ''))

        return isEmpty(value) || (value?.includes(" ") && value?.indexOf(" ") !== (value?.length - 1))
    },

    isPhone: (value: any) => validations.matchRegexp(value, /\d{1}((\(\d{3}\) ?)|(\d{3})\s) ?\d{3} \d{2} \d{2}/g),

    isEmail: (value: any) => validations.matchRegexp(value, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i),

    isEmpty: (value: any) => isEmpty(value),
    isUserName: (value: any) => {
        const password = validations.matchRegexp(value, /^[a-zA-Z0-9]([.-](?![.-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/)
        return password;
    },
    isBool: (value: any) => isEmpty(value) || value === true || value === false,
    minArrayLength: (value: any, min: any) => isEmpty(value) || !(value instanceof Array) || value?.length >= min,
    minArrayLengthRequired: (value: any, min: any) => !isEmpty(value) && !(value instanceof Array) || value?.length >= min,
    isTrue: (value: any) => isEmpty(value) || value === true,
    required: (value: any) => {
        if (typeof value === 'string' || value instanceof String) {
            // alert(value.replace(/\s/g, '').length);

            return (!isEmpty(value) && (value.replace(/\s/g, '').length !== 0));
        }
        else
            return !isEmpty(value);

    },

    trim: (value: any) => !isEmptyTrimed(value),

    isNumber: (value: any) => validations.matchRegexp(value, /^\d+$/),

    isFloat: (value: any) => {
        const isFloatx = validations.matchRegexp(value, /^(?:-?[1-9]\d*|-?0)?(?:\.\d+)?$/i);
        return isFloatx;
    },

    isPositive: (value: any) => {
        if (isExisty(value)) {
            return (validations.isNumber(value) || validations.isFloat(value)) && value >= 0;
        }
        return true;
    },

    maxNumber: (value: any, max: any) => isEmpty(value) || parseInt(value, 10) <= parseInt(max, 10),

    isEqual: (value: any, otherValue: any) => isEmpty(value) || value == otherValue,

    minNumber: (value: any, min: any) => isEmpty(value) || parseInt(value, 10) >= parseInt(min, 10),

    maxFloat: (value: any, max: any) => isEmpty(value) || parseFloat(value) <= parseFloat(max),

    minFloat: (value: any, min: any) => isEmpty(value) || parseFloat(value) >= parseFloat(min),

    isString: (value: any) => !isEmpty(value) || typeof value === 'string' || value instanceof String,

    minStringLength: (value: any, length: any) => (value + "").length >= length,

    maxStringLength: (value: any, length: any) => (value + "").length <= length,

    isPassword: (value: any) => {
        const password = validations.matchRegexp(value, /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*?[#?!@$%^&*-])/)
        return password;
    },

  
};

const messages = {
    isUserName: (value: any) => i18next.t("validation.isUserName"),
    matchRegexp: (value: any, regexp: any) => i18next.t("none"),
    isPhone: (value: any) => i18next.t("validation.phone"),
    isEmail: (value: any) => i18next.t("validation.email"),
    isEmpty: (value: any) => isEmpty(value),
    isNameSurname: () => i18next.t("validation.enter_surname"),
    required: (value: any) => i18next.t("validation.required"),
    trim: (value: any) => !isEmptyTrimed(value),
    isNumber: (value: any) => i18next.t("validation.number"),
    isFloat: (value: any) => i18next.t("validation.float"),
    isPositive: (value: any) => i18next.t("validation.positive_number"),
    maxNumber: (value: any, max: any) => i18next.t("validation.max_number").replace("[number]", max),
    minNumber: (value: any, min: any) => i18next.t("validation.min_number").replace("[number]", min),
    minArrayLength: (value: any, min: any) => i18next.t("validation.min_array_length").replace("[number]", min),
    minArrayLengthRequired: (value: any, min: any) => i18next.t("validation.min_array_length").replace("[number]", min),

    maxFloat: (value: any, max: any) => i18next.t("validation.max_number").replace("[number]", max),
    minFloat: (value: any, min: any) => i18next.t("validation.min_number").replace("[number]", min),
    isString: (value: any) => i18next.t("validation.string"),
    minStringLength: (value: any, length: any) => i18next.t("validation.min_string_length").replace("[length]", length),
    maxStringLength: (value: any, length: any) => i18next.t("validation.max_string_length").replace("[length]", length),
    isPassword: (value: any) => i18next.t("validation.isPassword"),
}

module.exports = {
    ValidationRules: validations,
    ValidationMessages: messages
};
