class Payment {
    constructor(transactionID, payDate, paymentType, amount, details) {
        this.transactionID = transactionID;
        this.payDate = payDate;
        this.paymentType = paymentType;
        this.amount = amount;
        this.details = details;
    }
}

export default Payment;