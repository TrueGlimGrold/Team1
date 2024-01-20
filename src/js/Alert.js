export default class Alert {
    constructor() {
        this.path = `../json/alert.json`;
    }
    getData() {
        return fetch(this.path)
        .then(convertToJson)
        .then((data) => data);
    }
};


console.Log() 