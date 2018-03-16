/**
 * Created by cbuonocore on 3/16/18.
 */

const library = (function () {
    const PORT = 9001;
    const BASE_URL = `localhost:${PORT}`;

    const getRandom = (items) => {
        return items[Math.floor(Math.random()*items.length)];
    };

    const formatDateTimeMs = (timeMs) => {
        const date = new Date(parseInt(timeMs));
        return `${date.toDateString()} ${date.toLocaleTimeString()}`;
    };

    function capitalize(str) {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return str;
    }

    return {
        BASE_URL: BASE_URL,
        capitalize: capitalize,
        getRandom: getRandom,
        formatDateTimeMs: formatDateTimeMs
    }

})();
module.exports = library;

