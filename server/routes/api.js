const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
var firebase = require('firebase');


// const sequelize = new Sequelize('mysql://root:13061992@localhost:3002/partylux')
const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL || "mysql://root:12345678@localhost/partylux");

const app = firebase.initializeApp({
    apiKey: "AIzaSyDbaqwcl8xEkDKUlSYf6KaxDFur3M405zQ",
    authDomain: "expensesapp-b7e5d.firebaseapp.com",
    databaseURL: "https://expensesapp-b7e5d.firebaseio.com",
    projectId: "expensesapp-b7e5d",
    storageBucket: "expensesapp-b7e5d.appspot.com",
    messagingSenderId: "37515044904",
    appId: "1:37515044904:web:b2bb9dab4e614f071fad1d",
    measurementId: "G-5YJ98ZDFWK"
});

router.post("/postData", async function (req, res) {
    let data = req.body;
    app.firestore().collection("data").add({
        name: data.name,
        costType: data.costType,
        description: data.description,
        price: data.price,
        category: data.category,
        date: data.date,
        id: data.id
    });
    console.log("server post data")
    res.end();
})


router.get("/getData", async function (req, res) {
    const snapshot = await firebase.firestore().collection('data').get()
    console.log("server get data")
    res.send(snapshot.docs.map(doc => doc.data()))
})

router.post("/deleteRow", async function (req, res) {
    let id = req.body.id
    let query = firebase.firestore().collection('data').where("id", "==", id)
    query.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });  
    })
    console.log("Server delete row with id of " + id)
    res.end()
})


module.exports = router
