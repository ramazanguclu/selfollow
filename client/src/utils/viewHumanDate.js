import humanDate from 'human-date';

export const startLog = (date) => {
    return date ? humanDate.relativeTime(new Date(date)) : '00:00:00';
};

export const detectState = (state) => {
    return state === 'end' ? 'START' : 'STOP';
};

export const datePretty = (ms) => {
    return !ms ? 'in progress' : humanDate.prettyPrint(new Date(ms), { showTime: true });
};