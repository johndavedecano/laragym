// @ts-nocheck
export const prevent = (callback) => {
    return event => {
        event.preventDefault();
        callback(event)
    }
}
