import Product from './product.js';

class Event {
    constructor(eventName, eventID, saleList, beginDate, endDate) {
        this.eventName = eventName;
        this.eventID = eventID;
        this.saleList = saleList;
        this.beginDate = beginDate;
        this.endDate = endDate;
    }
}

export default Event;
