let imageFilenames = [
    ['p1', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p2', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p3', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p4', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p5', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p6', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p7', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p8', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p9', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p10', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p11', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p12', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p13', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p14', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p15', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p16', 'p1_s1', 'p1_s2', 'p1_s3']
];

for (let i = 0; i < imageFilenames.length; i++) {
    for (let j = 0; j < imageFilenames[i].length; j++) {
        imageFilenames[i][j] = require(`../assets/products/${imageFilenames[i][j]}.jpg`);
    }
}

console.log(imageFilenames[0][0]);

export const products = [
    {
        productID: 1,
        name: 'Product 1',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',
            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo'
        },
        rate: 5,
        price: '13',
        imgURLs: imageFilenames[0],
        numSold: 0,
    },
    {
        productID: 2,
        name: 'Product 2',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',
            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo'
        },
        rate: 5,
        price: '20',
        imgURLs: imageFilenames[1],
        numSold: 0,
    },
    {
        productID: 3,
        name: 'Product 3',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',
            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo'
        },
        rate: 5,
        price: '30',
        imgURLs: imageFilenames[2],
        numSold: 0,
    },
    {
        productID: 4,
        name: 'Product 4',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',
            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo'
        },
        rate: 5,
        price: '40',
        imgURLs: imageFilenames[3],
    },
    {
        productID: 5,
        name: 'Product 5',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',
            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo'
        },
        rate: 5,
        price: '50',
        imgURLs: imageFilenames[4],
        numSold: 0,
    },
    {
        productID: 6,
        name: 'Product 6',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',
            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo'
        },
        rate: 5,
        price: '30',
        imgURLs: imageFilenames[5],
        numSold: 0,
    },
    {
        productID: 7,
        name: 'Product 7',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',
            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo',
        },
        rate: 5,
        price: '27',
        imgURLs: imageFilenames[6],
        numSold: 0,
    },
    {
        productID: 8,
        name: 'Product 8',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',

            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo',
        },
        rate: 5,
        price: '30',
        imgURLs: imageFilenames[7],
        numSold: 0,
    },
    {
        productID: 9,
        name: 'Product 9',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',
            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo',
        },
        rate: 5,
        price: '20',
        imgURLs: imageFilenames[8],
    },
    {
        productID: 10,
        name: 'Product 10',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',

            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo',
        },
        rate: 5,
        price: '10',
        imgURLs: imageFilenames[9],
    },
    {
        productID: 11,
        name: 'Product 11',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',

            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo',
        },
        rate: 5,
        price: '11',
        imgURLs: imageFilenames[10],
    },
    {
        productID: 12,
        name: 'Product 12',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',

            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo',
        },
        rate: 5,
        price: '12',
        imgURLs: imageFilenames[11],
    },
   {
        productID: 13,
        name: 'Product 13',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',

            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',

            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',

            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo',
        },
        rate: 5,
        price: '13',
        imgURLs: imageFilenames[12],
    },
    {
        productID: 14,
        name: 'Product 14',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',

            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',

            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',

            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo',
        },
        rate: 5,
        price: '14',
        imgURLs: imageFilenames[13],
    },
    {
        productID: 15,
        name: 'Product 15',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',

            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',

            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',

            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo',
        },
        rate: 5,
        price: '15',
        imgURLs: imageFilenames[14],
    },
    {
        productID: 16,
        name: 'Product 16',
        description: {
            type: 'Tee',
            Occasion: 'Casual',
            Color: 'Blue',

            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            SleevesLength: 'Long Sleeve',

            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',

            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Mensclo',
        },
        rate: 5,
        price: '16',
        imgURLs: imageFilenames[15],
    }
];
