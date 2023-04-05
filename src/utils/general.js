import i18next from "i18next";
import { Alert, Linking } from "react-native";
import moment from "moment"
import { AppRunIsProd } from "../config/app-config";


const UNIT_CONVERSIONS = {
    KG_TO_POUND: 2.2046226218,
    FOOT_TO_CM: 30.48,
    INCH_TO_CH: 2.54,
}


const isNullOrEmpty = (value) => (value === "" || value === null || value === undefined || value === "undefined" || (value instanceof Array && value?.length === 0))

const apiDateFormatToUserFormat = (date, showTime) => {
    if (isNullOrEmpty(date))
        return null;
    if (isNaN(Date.parse(date)))
        return null;
    var parsedDate = new Date(date);
    if (parsedDate === NaN)
        return null;
    if (showTime)
        return moment(parsedDate).format("DD.MM.YYYY HH:mm");
    else
        return moment(parsedDate).format("DD.MM.YYYY");
}

const apiTimeFormatToUserFormat = (date) => {
    if (isNullOrEmpty(date))
        return null;
    if (isNaN(Date.parse(date)))
        return null;
    var parsedDate = new Date(date);
    if (parsedDate === NaN)
        return null;
    return moment(parsedDate).format("HH:mm");
}



const FootAndInchToCm = (foot, inch) => {
    if (inch > 11.9) {
        var addFoots = inch / 12;
        if (!(inch % 12)) {
            inch = 0;
        } else {
            inch = inch % 12;
        }
        foot = foot + parseInt(addFoots.toFixed(0), 10);
    }

    var cm = foot * UNIT_CONVERSIONS.FOOT_TO_CM;
    cm += inch * UNIT_CONVERSIONS.INCH_TO_CH;

    return cm.toFixed(2);
}

const twoDateDiffrence = (second) => {
    if (second != 0) {
        const hours = new Date(second * 1000).toISOString().substring(11, 13);
        const minutes = new Date(second * 1000).toISOString().substring(14, 16);
        const secs = new Date(second * 1000).toISOString().substring(17, 19);
        return { hours, minutes, secs }
    } else {
        return { hours: 0, minutes: 0, secs: 0 }
    }

}

const twoDateDiffrenceSecond = (start) => {
    const end = new Date();
    var dif = (end.getTime() - start.getTime()) / 1000;
    return dif;
}

const debounce = (func, delay) => {
    let debounceTimer
    return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer
            = setTimeout(() => func.apply(context, args), delay)
    }
}

const customDateControl = (date) => {
    const controlDate = new Date(date);
    const currencyDate = new Date();
    if ((controlDate.getDate() == currencyDate.getDate()) && (controlDate.getMonth() == currencyDate.getMonth()) && (controlDate.getFullYear() == currencyDate.getFullYear())) {
        return i18next.t("general.today") + ", " + moment(controlDate).format('HH:mm');
    }
    else {
        return moment(controlDate).format('DD.MM.YYYY, HH:mm');
    }
}

const cmToFootAndInch = (cm) => {
    var approxFoot = (cm / UNIT_CONVERSIONS.FOOT_TO_CM);
    var decimals = approxFoot % 1;
    var inch = Math.round(decimals * 12);
    var foot = (parseFloat(cm) < UNIT_CONVERSIONS.FOOT_TO_CM) ? 0 : Math.floor(approxFoot);

    return {
        foot: foot,
        inch: inch
    };
}
const kgToPound = (kg) => {
    return (kg * UNIT_CONVERSIONS.KG_TO_POUND).toFixed(1);
}

const poundToKg = (pound) => {
    return (pound / UNIT_CONVERSIONS.KG_TO_POUND).toFixed(1);
}

const isNumber = value => matchRegexp(value, /^\d+$/);

const isFloat = (value) => {
    const isFloatx = matchRegexp(value, /^(?:-?[1-9]\d*|-?0)?(?:\.\d+)?$/i);
    return isFloatx;
}

const matchRegexp = (value, regexp) => {
    const validationRegexp = (regexp instanceof RegExp ? regexp : (new RegExp(regexp)));
    return (validationRegexp.test(value));
}



function removeEmojis(string) {
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.toString().replace(regex, '');
}

const PhoneRegex = /\d{1}((\(\d{3}\) ?)|(\d{3})\s) ?\d{3} \d{2} \d{2}/g;
const PhoneMask = "9(999) 999 99 99";
const IdentityNoMask = "99999999999";


const alertError = (val, header = "general.error") => {
    Alert.alert(i18next.t(header), i18next.t(val))
}

const alertWarning = (val) => {
    Alert.alert(i18next.t("general.warning"), i18next.t(val))
}

const alertSuccess = (val) => {
    Alert.alert(i18next.t("general.success"), i18next.t(val))
}

const alertQuest = ({ message, onClickNo, onClickYes }) => {
    Alert.alert(
        i18next.t("general.warning"),
        i18next.t(message),
        [
            {
                text: i18next.t("action.no"), style: "default",
                onPress: () => {
                    if (onClickNo instanceof Function) onClickNo();
                },
            },
            {
                text: i18next.t("action.yes"),
                onPress: () => {
                    if (onClickYes instanceof Function) onClickYes();
                },
                style: "destructive"
            },

        ],
        { cancelable: false }
    )
}



const generateRandomString = (length = 15) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const generateKeyForUpdateGridItem = (id) => {
    return { id, key: generateRandomString(10) }
}

const addDaysToDate = (date, day) => {
    date.setDate(date.getDate() + day);
    return date;
}

const isLoggedIn = () => !isNullOrEmpty(global?.token)

const minMaxStringLength = ({ min, max }) => ([{ rule: "minStringLength", value: min }, { rule: "maxStringLength", value: max }])

const passwordRules = [{ rule: "minStringLength", value: 6 }, { rule: "maxStringLength", value: 20 }];

const getFileExtension = fileName => fileName?.substr(fileName?.lastIndexOf('.') + 1)?.toLowerCase();

const isImageExtension = extension => ["jpg", "jpeg", "png"].includes(extension?.toLowerCase());

const isVideoExtension = extension => ["mp3", "mp4"].includes(extension?.toLowerCase());

const callPhone = (phone) => Linking.openURL(`tel:${phone}`).catch((err) => console.error('An error occurred', err));

const arrayMove = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

const toUpper = text => {
    if (typeof text !== "string")
        return text;
    return text?.toLocaleUpperCase('en-En');
};


const isExpried = (date) => {
    const convertedDate = moment(date).set({ hour: 23, minute: 59 });
    return moment(new Date()).isAfter(convertedDate);

}

const mergeDateFormat = (startDate, endDate) => {
    moment.locale('tr')
    const date = moment(startDate).format('YYYY-MM-DD');
    const startTime = moment(startDate).format('HH:mm');
    const endTime = moment(endDate).format('HH:mm');
    let newDate = moment(date)

    return newDate.format('LL') + " um " + startTime + " " + endTime + ' Uhr';
}

const hasAccess = (action) => {
    if (global.roles !== null)
        return global?.roles?.has(action);
    else
        return false
}

const moneyInputRules = [{ rule: "required" }, { rule: "isNumber" }, { rule: "minNumber", value: 1 }, { rule: "maxNumber", value: 99999 }];
const descriptionRules = [{ rule: "maxStringLength", value: 250 }]

const getFirstFile = (filesJson) => {
    if (isNullOrEmpty(filesJson))
        return null;
    const files = JSON.parse(filesJson);
    return files[0];
}


const scrollToItemIfNotValid = (validatorResponse, scrollRef) => {
    if (!isNullOrEmpty(validatorResponse?.firstInvalidItem?.coordinate?.y)) {
        scrollRef?.current?.scrollTo({ y: validatorResponse?.firstInvalidItem?.coordinate?.y, animated: true })

    }
}


const areEqualFilter = (f1, f2) => {

    const keys = new Set();
    Object.keys(f1).map(key => {
        keys.add(key)
    })
    Object.keys(f2).map(key => {
        keys.add(key)
    })
    let areEqual = true;
    keys.forEach(key => {
        log(key, f1[key], f2[key])
        if (f1[key] == f2[key])
            return;
        if (isNullOrEmpty(f1[key]) && isNullOrEmpty(f2[key]))
            return;
        if (JSON.stringify(f1[key]) === JSON.stringify(f2[key]))
            return;
        areEqual = false;
    });
    return areEqual;
}

const log = (...args) => {
    if (!AppRunIsProd)
        console.log(...args);
}

const convertSeoLink = (text) => {
    return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ğ/g, 'g').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ç/g, 'c').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '').replace(/[\s_-]+/g, '-');
}


const getLocalISOString = (date) => {
    const offset = date.getTimezoneOffset()
    const offsetAbs = Math.abs(offset)
    const isoString = new Date(date.getTime() - offset * 60 * 1000).toISOString()
    return `${isoString.slice(0, -1)}${offset > 0 ? '-' : '+'}${String(Math.floor(offsetAbs / 60)).padStart(2, '0')}:${String(offsetAbs % 60).padStart(2, '0')}`
}

const currencyFormat = (num) => {
    return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ₺'
}

const formatPhoneNumber = async (phoneNumberString) => {
    let newPhone = phoneNumberString;
    return await newPhone.replace(/\D/g, '');
}



export default {
    getLocalISOString,
    scrollToItemIfNotValid,
    areEqualFilter,
    formatPhoneNumber,
    log,
    hasAccess,
    toUpper,
    getFirstFile,
    isExpried,
    isImageExtension,
    getFileExtension,
    isVideoExtension,
    arrayMove,
    passwordRules,
    descriptionRules,
    moneyInputRules,
    convertSeoLink,
    apiTimeFormatToUserFormat,
    isLoggedIn,
    callPhone,
    minMaxStringLength,
    alertQuest,
    isNullOrEmpty,
    addDaysToDate,
    apiDateFormatToUserFormat,
    FootAndInchToCm,
    generateRandomString,
    generateKeyForUpdateGridItem,
    alertError,
    alertWarning,
    alertSuccess,
    PhoneMask,
    IdentityNoMask,
    PhoneRegex,
    cmToFootAndInch,
    isNumber,
    isFloat,
    kgToPound,
    poundToKg,
    matchRegexp,
    removeEmojis,
    debounce,
    twoDateDiffrence,
    mergeDateFormat,
    customDateControl,
    twoDateDiffrenceSecond,
    currencyFormat,
}
