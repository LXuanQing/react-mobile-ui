const doc = document;

const unitize = (any) => {
    let ret;
    if (typeof any === 'number') {
        ret = `${any}px`;
    } else if (typeof any === 'string') {
        if (any.match(/^\d+$/)) {
            ret = `${any}px`;
        } else {
            ret = any;
        }
    } else {
        ret = 0;
    }
    return ret;
};

export default {
    unitize
};