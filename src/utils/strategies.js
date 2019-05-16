export let strategies = {
    isNonEmpty(value, errorMsg) {
        if (value == "" || value == null) {
            return errorMsg;
        }
    },
    isMobile(value, errorMsg) {
        if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    },
    minLength(value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg;
        }
    },
    isEqual(valueOne, valueTwo, errMsg) {
        if (valueOne != valueTwo) {
            return errMsg;
        }
    }
};
