const store = () => {
    let state = 0;

    return [
        getState = () => state,
        setState = () => state++
    ]
}

module.exports = store;