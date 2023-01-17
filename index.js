
const result = [];

function getFlat(obj, parent) {
    for (key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const element = obj[key];

            if (typeof element === 'object' && !Array.isArray(element) && element !== null) {
                let keyName = null;
                if (parent) {
                    keyName = `${parent}.${key}`;
                }
                getFlat(element, keyName || key);
            } else if (!parent) {
                result.push({
                    [key]: element
                });
            } else {
                const newFlatKeyName = `${parent}.${key}`;
                result.push({
                    [newFlatKeyName]: element
                });
            }
        }
    }
}


function getFlatObject(object) { 
    getFlat(object);
    return result
}

module.exports.getFlatObject = getFlatObject