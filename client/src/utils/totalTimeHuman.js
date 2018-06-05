const config = [
    { name: 'second', unit: 1000, ref: 'milisecond', short: 'ms', hide: true },
    { name: 'minute', unit: 60, ref: 'second', short: 's', hide: false },
    { name: 'hour', unit: 60, ref: 'minute', short: 'm', hide: false },
    { name: 'day', unit: 24, ref: 'hour', short: 'h', hide: false },
    { name: 'week', unit: 7, ref: 'day', short: 'd', hide: false },
    { name: 'month', unit: 4, ref: 'week', short: 'w', hide: false },
    { name: 'year', unit: 12, ref: 'month', short: 'month', hide: false },
    { name: 'century', unit: 100, ref: 'year', short: 'year', hide: false }
];

export default (milisecond, count) => {
    let total = milisecond;
    let result = [];

    for (var i = 0; i < config.length; i++) {
        var item = config[i];

        var n = total % item.unit;

        if (!item.hide) {
            result.push(n + ' ' + item.ref);
        }

        total -= n;

        if (total === 0) break;

        total = total / item.unit;
    }

    result = result.reverse().splice(0, count);
    return result.join(', ');
};

