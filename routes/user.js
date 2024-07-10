const { Router } = require("express");
const router = Router();
const path = require("path");
let LoginUserData = require("../LoginUserData/data");
const { createjwttoken } = require("../services/authetication")
const SaveBill = require("../models/user")
const billdata=require("../models/user")

router.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "../HTML", "index.html"));
});

router.get("/Admin", (req, res) => {
    let Admindata = req.user;
    if (Admindata._id !=='0701211028') {
        return res.redirect("/")
    }
    else {
        return res.sendFile(path.join(__dirname, "../HTML", "Admin.html"));
    }
})

router.get("/Admin/data", async(req, res) => {
    let Admindata = req.user;
    const allBillinfo=await billdata.find();
    if (!Admindata) {
        return res.status(401).json({ error: "Access Denied" });
    }
    return res.json(Admindata)
})


router.get("/Admin/billinfo", async(req, res) => {
    let Admindata = req.user;
    const allBillinfo=await billdata.find();
    if (!Admindata) {
        return res.status(401).json({ error: "Access Denied" });
    }
    return res.json(allBillinfo)
})

router.get("/Cashier", (req, res) => {
    let cashierdata = req.user;
    if (cashierdata._id !=='0701211029') {
        return res.redirect("/")
    }
    else{
        return res.sendFile(path.join(__dirname, "../HTML", "Cashier.html"));
    }
})

router.get("/Cashier/data", (req, res) => {
    let cashierdata = req.user;
    if (!cashierdata) {
        return res.status(401).json({ error: "Access Denied" });
    }
    return res.json(cashierdata);
})

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
})

router.post("/signin", async (req, res) => {
    const { userid, userpassword } = req.body;
    const UserLoginData = LoginUserData.filter(
        (v) => v._Id == userid && v.password == userpassword
    );

    try {
        if (UserLoginData[0]._Id == "0701211028") {
            const token = await createjwttoken(UserLoginData[0])
            return res.cookie("token", token).redirect("/Admin")
        } else {
            const token = await createjwttoken(UserLoginData[0])
            return res.cookie("token", token).redirect("/Cashier")
        }
    } catch (error) {
        console.log(error)
    }
});

router.post("/Cashier/BillData", async (req, res) => {
    const { BillNo, CashierName, CashierId, Date, TotalItemQuantity, TotalItemPrice, AllItemName } = req.body;
    await SaveBill.create({
        BillNo,
        CashierName,
        CashierId,
        Date,
        TotalItemQuantity,
        TotalItemPrice,
        AllItemName,
    });
    return res.status(200).json({ message: "Bill is Saved Before Next Bill please Clear Table." });
});

module.exports = router;
