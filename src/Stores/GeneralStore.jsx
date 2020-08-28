import { observable, action } from "mobx";
import axios from "axios";
const userRoute = "http://localhost:4200";
export default class GeneralStore {
    @observable lightMode = localStorage.theme === "light" ? false : true;
    @observable amountLeft = 5000;
    @observable transactions = [];
    @observable dataToChart = [];

    @action calcDataToChart = () => {
        let data = [
            {
                costType: "a",
                aviv: 0,
                chen: 0,
                avivChen: 0,
            },
            {
                costType: "b",
                aviv: 0,
                chen: 0,
                avivChen: 0,
            },
        ]
        for (let t of this.transactions) {
            if (t.costType === 'a') {
                if (t.name === "aviv") {
                    data[0].aviv += t.price
                }
                else if (t.name === "chen") {
                    data[0].chen += t.price
                }
                else {
                    data[0].avivChen += t.price
                }
            }
            else {
                if (t.name === "aviv") {
                    data[1].aviv += t.price
                }
                else if (t.name === "chen") {
                    data[1].chen += t.price
                }
                else {
                    data[1].avivChen += t.price
                }
            }
            console.log(data)
        }
        this.dataToChart = data
        console.log(this.dataToChart)
    }

    @action toggleLightMode = (bool) => {
        localStorage.setItem("theme", bool ? "dark" : "light");
        console.log(bool)
        this.lightMode = bool;
    };

    @action saveButtonPressed = async (costType, name, description, price, category, date) => {
        this.transactions.push({ costType, name, description, price, category, date })
        await axios.post(`${userRoute}/postData`, {
            costType,
            name,
            description,
            price,
            category,
            date,
        })
        this.arrangeForCharts();
        this.calcDataToChart();
    }

    @action arrangeForCharts() {
        this.transactionsMadeByAviv = this.transactions.filter(a => a.name === "aviv")
        this.transactionsMadeByChen = this.transactions.filter(a => a.name === "chen")
        this.transactionsMadeByChenAndAviv = this.transactions.filter(a => a.name === "avivChen")
        console.log(this.transactions)


        console.log(this.transactionsMadeByAviv)
    }

    @action async getData() {
        let newData = await axios.get(`${userRoute}/getData/`)
        this.transactions = newData.data
        this.calcDataToChart()
    }
}
