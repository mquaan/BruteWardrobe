
export const customers = [
    {
        username: 'dat123', 
        password: '123', 
        email: '123@gmail.com', 
        shopping: {
            orderList: [
                {
                    orderID: 1,
                    productList: [1, 2, 3],
                    quantityList: [2, 2, 1],
                    orderStatus: 'Processing',
                    dateCreated: new Date("2023-12-01")
                }
            ]
        }
    },
    
    {
        username: 'phatdat21', 
        password: 'abc', 
        email: 'abc@gmail.com', 
        shopping: {
            orderList: [
                {
                    orderID: 2,
                    productList: [2],
                    quantityList: [3],
                    orderStatus: 'Processing',
                    dateCreated: new Date("2023-12-02")
                },
                {
                    orderID: 12,
                    productList: [2, 1],
                    quantityList: [3, 2],
                    orderStatus: 'Processing',
                    dateCreated: new Date("2023-11-02")
                }
            ]
        }
    },
    
    {
        username: 'datne', 
        password: 'xyz', 
        email: 'xyz@gmail.com', 
        shopping: {
            orderList: [
                {
                    orderID: 3,
                    productList: [4, 1],
                    quantityList: [2, 1],
                    orderStatus: 'Processing',
                    dateCreated: new Date("2023-12-05")
                }
            ]
        }
    },
    
    {
        username: 'tuilakhachhang', 
        password: 'dat', 
        email: 'dat@gmail.com', 
        shopping: {
            orderList: [
                {
                    orderID: 4,
                    productList: [3, 4],
                    quantityList: [1, 1],
                    orderStatus: 'Processing',
                    dateCreated: new Date("2023-12-10")
                }
            ]
        }
    },
    
]