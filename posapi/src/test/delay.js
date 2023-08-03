const delay = (miliseconds, fn) => {
    setTimeout( () => {
        fn();}, miliseconds);
};
module.exports = delay;