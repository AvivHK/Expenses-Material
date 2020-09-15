import { observable, action } from "mobx";
import axios from "axios";
import uniqid from "uniqid"
const userRoute = "http://localhost:4200";
// const userRoute = "";

export default class GeneralStore {
    @observable lightMode = localStorage.theme === "light" ? false : true;
    @observable amountLeft = 5000;
    @observable transactions = [];
    @observable transactionsThisMonth = [];
    @observable dataToChart = [];
    @observable rowToDelete = null
    @observable months = [{ month: "אוגוסט", year: "20201", total: 5000, var: 3500, fixed: 1500 },{ month: "אוגוסט", year: "20202", total: 5000, var: 3500, fixed: 1500 },{ month: "אוגוסט", year: "20203", total: 5000, var: 3500, fixed: 1500 },{ month: "אוגוסט", year: "20204", total: 5000, var: 3500, fixed: 1500 },{ month: "אוגוסט", year: "20205", total: 5000, var: 3500, fixed: 1500 },{ month: "אוגוסט", year: "20206", total: 5000, var: 3500, fixed: 1500 },{ month: "אוגוסט", year: "20207", total: 5000, var: 3500, fixed: 1500 }]

    @action calcDataToChart = () => {
        let data = [
            {
                costType: "תועובק תואצוה",
                aviv: 0,
                chen: 0,
                avivChen: 0,
            },
            {
                costType: "תונתשמ תואצוה",
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
            id: uniqid()
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

    @action deleteTransaction = async () => {
        axios.post(`${userRoute}/deleteRow`, { id: this.rowToDelete.id })
        this.transactions.splice(this.transactions.findIndex(t => t.id === this.rowToDelete.id), 1)
        this.rowToDelete = null;
    }

    @action setRowToDelete = row => {
        this.rowToDelete = row;
    }
}
