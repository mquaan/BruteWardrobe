class Deliver {
    constructor(deliverID, address, deliverDate, deliverCost) {
        this.deliverID = deliverID;
        this.address = address;
        this.deliverDate = deliverDate;
        this.deliverStatus = 'Unfulfilled';
        this.deliverCost = deliverCost;
    }
}

export default Deliver;
