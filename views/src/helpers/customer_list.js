
export const customers = [
    {
        username: 'dat123',
        password: '123',
        email: '123@gmail.com',
        shopping: {
            cart: [],
            orderList: [
                {
                    orderID: 1,
                    cart: [
                        {
                            productID: 1,
                            quantity: 2,
                            size: 'L'
                        },
                        {
                            productID: 2,
                            quantity: 2,
                            size: 'M'
                        },
                        {
                            productID: 3,
                            quantity: 1,
                            size: 'S'
                        }
                    ],
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
            cart: [],
            orderList: [
                {
                    orderID: 2,
                    cart: [
                        {
                            productID: 2,
                            quantity: 3,
                            size: 'L'
                        },
                    ],
                    orderStatus: 'Processing',
                    dateCreated: new Date("2023-12-02")
                },
                {
                    orderID: 12,
                    cart: [
                        {
                            productID: 2,
                            quantity: 3,
                            size: 'M'
                        },
                        {
                            productID: 1,
                            quantity: 2,
                            size: 'S'
                        },

                    ],
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
            cart: [],
            orderList: [
                {
                    orderID: 3,
                    cart: [
                        {
                            productID: 4,
                            quantity: 1,
                            size: 'L'
                        },
                        {
                            productID: 1,
                            quantity: 1,
                            size: 's'
                        },
                    ],
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
            cart: [],
            orderList: [
                {
                    orderID: 4,
                    cart: [
                        {
                            productID: 3,
                            quantity: 1,
                            size: 'L'
                        },
                        {
                            productID: 4,
                            quantity: 1,
                            size: 'M'
                        },
                    ],
                    orderStatus: 'Processing',
                    dateCreated: new Date("2023-12-10")
                }
            ]
        }
    },

]