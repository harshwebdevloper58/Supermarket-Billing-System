const {model,Schema} = require('mongoose');

const billSchema = new Schema({
    BillNo: {
        type: String,
        required: true,
        unique: true
    },
    CashierName: {
        type: String,
        required: true
    },
    CashierId: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    TotalItemQuantity: {
        type: Number,
        required: true
    },
    TotalItemPrice: {
        type: Number,
        required: true
    },
    AllItemName: {
        type: [String],
        required: true
    }
});

const Bill = model('Bill', billSchema);

module.exports = Bill;
