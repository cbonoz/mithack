/**
 * Created by cbuonocore on 3/16/18.
 */

// Helper utilities for the rekeyed server.
const library = (function () {

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
        capitalize: capitalize,
        getRandom: getRandom,
        formatDateTimeMs: formatDateTimeMs
    };

})();
module.exports = library;

