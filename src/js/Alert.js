import { renderListWithTemplate } from "./utils.mjs";

export default class Alert {
    constructor(element) {
        this.path = `../json/alert.json`;
        this.element = element;
    }
    getData() {
        return fetch(this.path)
        .then(convertToJson)
        .then((data) => data);
    }
    async init() {
        const alertList = await this.getData();
        const template = generateAlertTemplate(alertList);
        console.log(template);
        this.element.insertAdjacentHTML("afterbegin", template);
    }
};

function generateAlertTemplate (alertList) {
    let template = "";
    template += `<section class="alert-list">`
    alertList.forEach(alert => {
    template += `\n <p style="background-color:${alert.background}" style="color=${alert.color}">${alert.message}</p>`
    });
    template += `\n</section>`
    return template;
    }

function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

