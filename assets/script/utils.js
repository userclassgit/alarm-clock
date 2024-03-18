// Get HTML element by id
export function getElement(selector, scope = document) {
    return scope.getElementById(selector);
}

// Select HTML element
export function select(selector, scope = document) {
    return scope.querySelector(selector);
}

// Get a list of HTML elements as an array
export function selectAll(selector, scope = document) {
    return [...scope.querySelectorAll(selector)];//this converts the NodeList into an array.
}

// Add event listener
export function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}