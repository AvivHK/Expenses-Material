import { observable, action } from "mobx";
// import axios from "axios";
export default class GeneralStore {
    @observable fixedCosts = [{ price: 50, name: "סלקום" }];
    @observable variableCosts = [{ price: 38, name: "פיצה" }];
    @observable lightMode = localStorage.theme === "light" ? false : true;



    @action toggleLightMode = (bool) => {
        localStorage.setItem("theme", bool ? "dark" : "light");
        console.log(bool)
        this.lightMode = bool;
    };
}
