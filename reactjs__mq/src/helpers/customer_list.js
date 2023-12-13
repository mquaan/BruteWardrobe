import Customer from '../../../models/customer.js'
import Shopping from '../../../models/shopping.js'
import Order from '../../../models/order.js'

export const customers = [
    Customer('123', '123', '123@gmail.com', 
    shopping = Shopping([
        Order(1, [1, 2, 3], [2, 2, 1], new Date(), null, null),
    ])),
    Customer('abc', 'abc', 'abc@gmail.com', 
    shopping = Shopping([
        Order(2, [2], [3], new Date(), null, null),
    ])),
    Customer('xyz', 'xyz', 'xyz@gmail.com', 
    shopping = Shopping([
        Order(3, [4, 1], [2, 1], new Date(), null, null),
    ])),
    Customer('dat', 'dat', 'dat@gmail.com', 
    shopping = Shopping([
        Order(4, [3, 4], [1, 1], new Date(), null, null),
    ])),
]