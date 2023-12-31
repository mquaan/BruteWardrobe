let imageFilenames = [
    ['p1', 'p1_s1', 'p1_s2', 'p1_s3'],
    ['p2', 'p2_s1', 'p2_s2', 'p2_s3'],
    ['p3', 'p3_s1', 'p3_s2', 'p3_s3'],
    ['p4', 'p4_s1', 'p4_s2', 'p4_s3'],
    ['p5', 'p5_s1', 'p5_s2', 'p5_s3'],
    ['p6', 'p6_s1', 'p6_s2', 'p6_s3'],
    ['p7', 'p7_s1', 'p7_s2', 'p7_s3'],
    ['p8', 'p8_s1', 'p8_s2', 'p8_s3'],
    ['p9', 'p9_s1', 'p9_s2', 'p9_s3'],
    ['p10', 'p10_s1', 'p10_s2', 'p10_s3'],
    ['p11', 'p11_s1', 'p11_s2', 'p11_s3'],
    ['p12', 'p12_s1', 'p12_s2', 'p12_s3'],
    ['p13', 'p13_s1', 'p13_s2', 'p13_s3'],
    ['p14', 'p14_s1', 'p14_s2', 'p14_s3'],
    ['p15', 'p15_s1', 'p15_s2', 'p15_s3'],
    ['p16', 'p16_s1', 'p16_s2', 'p16_s3']
];

for (let i = 0; i < imageFilenames.length; i++) {
    for (let j = 0; j < imageFilenames[i].length; j++) {
        imageFilenames[i][j] = require(`/src/assets/products/${imageFilenames[i][j]}.jpg`);
    }
}

console.log(imageFilenames[0][0]);

export const products = [
    {
        productID: 1,
        name: 'Mens Corduroy Color Block Panel Stitching Casual Long Sleeve Shirts',
        description: {
            Type: 'Shirts',
            Occasion: 'Casual',
            Color: 'Blue',
            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            Length: 'Long Sleeve',
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
        name: 'Mens Smile Face Embroidery Color Block Knit Short Sleeve Shirts',
        description: {
            Type: 'Shirts',
            Occasion: 'Vacation',
            Color: 'Black',
            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            Length: 'Short Sleeve',
            Brand: 'KOYYE',
            Thickness: 'Moderate',
            Season: 'Summer',
            DesignElement: 'Embroidered, Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Newchic'
        },
        rate: 5,
        price: '20',
        imgURLs: imageFilenames[1],
        numSold: 0,
    },
    {
        productID: 3,
        name: 'Mens Ethnic Geometric Print Stitching Crew Neck Short Sleeve T-Shirts',
        description: {
            Type: 'T-Shirts',
            Occasion: 'Street',
            Color: 'White',
            Pattern: 'Geometric Pattern, Ethnic Pattern',
            Collar: 'Crew Neck',
            Material: 'Spandex, Polyester',
            Length: 'Short Sleeve',
            Brand: 'Mensclo',  
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Patchwork, Button',
            FitType: 'Regular',
            Collection: 'Newchic'
        },
        rate: 5,
        price: '30',
        imgURLs: imageFilenames[2],
        numSold: 0,
    },
    {
        productID: 4,
        name: 'Mens Rose Japanese Print Patchwork Crew Neck Short Sleeve T-Shirts',
        description: {
            Type: 'T-Shirts',
            Occasion: 'Street',
            Color: 'Brown',
            Pattern: 'Floral Print',
            Collar: 'Crew Neck',
            Material: 'Polyester',
            Length: 'Short Sleeve',
            Brand: 'KOYYE',
            Thickness: 'Moderate',
            Season: 'Summer',
            DesignElement: 'Print, Patchwork',
            FitType: 'Regular',
            Collection: 'Newchic'
        },
        rate: 5,
        price: '40',
        imgURLs: imageFilenames[3],
    },
    {
        productID: 5,
        name: 'Mens Logo Ribbon Letter Print Contrast Stitching Street Hoodies',
        description: {
            Type: 'Hoodies',
            Occasion: 'Casual',
            Color: 'Red',
            Pattern: 'Letter Print',
            Collar: 'Hooded',
            Material: 'Polyester',
            Length: 'Long Sleeve',
            Brand: 'INCERUN',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Ribbon, Drawstring, Print, Patchwork',
            FitType: 'Loose',
            Collection: 'Newchic'
        },
        rate: 5,
        price: '50',
        imgURLs: imageFilenames[4],
        numSold: 0,
    },
    {
        productID: 6,
        name: 'Mens Chinese Style Panda Print Loose Drawstring Hoodies Winter',
        description: {
            Type: 'Hoodies',
            Occasion: 'Basics',
            Color: 'White',
            Pattern: 'Animals, Cartoon Pattern',
            Collar: 'Hooded',
            Material: 'Cotton, Polyester',
            Length: 'Long Sleeve',
            Brand: 'KOYYE',
            Thickness: 'Moderate',
            Season: 'Winter',
            DesignElement: 'Print, Drawstring',
            FitType: 'Loose',
            Collection: 'Newchic'
        },
        rate: 5,
        price: '30',
        imgURLs: imageFilenames[5],
        numSold: 0,
    },
    {
        productID: 7,
        name: 'Mens Japanese Cat Print Crew Neck Loose Pullover Sweatshirts',
        description: {
            Type: 'Sweatshirts',
            Occasion: 'Basics',
            Color: 'Black',
            Pattern: 'Cartoon Pattern, Animals, Cat',
            Collar: 'Crew Neck',
            Material: 'Cotton, Polyester',
            Length: 'Long Sleeve',
            Brand: 'INCERUN',
            Thickness: 'Moderate',
            Season: 'Winter',
            DesignElement: 'Print',
            FitType: 'Loose',
            Collection: 'Newchic',
        },
        rate: 5,
        price: '27',
        imgURLs: imageFilenames[6],
        numSold: 0,
    },
    {
        productID: 8,
        name: 'Mens Cartoon Panda Japanese Print Crew Neck Pullover Sweatshirts',
        description: {
            Type: 'Sweatshirts',
            Occasion: 'Casual',
            Color: 'White',
            Pattern: 'Cartoon Pattern, Animals',
            Collar: 'Crew Neck',
            Material: 'Cotton, Polyester',
            Length: 'Long Sleeve',
            Brand: 'KOYYE',
            Thickness: 'Moderate',
            Season: 'Winter',
            DesignElement: 'Print',
            FitType: 'Regular',
            Collection: 'Newchic',
        },
        rate: 5,
        price: '25',
        imgURLs: imageFilenames[7],
        numSold: 0,
    },
    {
        productID: 9,
        name: 'Mens Smile Ethnic Pattern Patchwork Drawstring Waist Loose Pants',
        description: {
            Type: 'Pants',
            Occasion: 'Steet',
            Color: 'Brown',
            Pattern: 'Geometric Pattern, Ethnic Pattern',
            Collar: 'Lapel Collar',
            Material: 'Spandex, Polyester',
            Length: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Pocket, Drawstring, Print, Patchwork',
            FitType: 'Loose',
            Collection: 'Newchic',
        },
        rate: 5,
        price: '20',
        imgURLs: imageFilenames[8],
    },
    {
        productID: 10,
        name: 'Mens Japanese Print Contrast Patchwork Loose Drawstring Waist Pants',
        description: {
            Type: 'Pants',
            Occasion: 'Vacation',
            Color: 'Green',
            Pattern: 'Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            Length: 'Long Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Spring',
            DesignElement: 'Pocket, Print, Drawstring',
            FitType: 'Loose',
            Collection: 'Newchic',
        },
        rate: 5,
        price: '10',
        imgURLs: imageFilenames[9],
    },
    {
        productID: 11,
        name: 'Mens Coconut Tree Embroidered Patchwork Corduroy Hawaiian Vacation Shorts',
        description: {
            Type: 'Shorts',
            Occasion: 'Vacation',
            Color: 'Blue',
            Pattern: 'Plants',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            Length: 'Short',
            Brand: 'Mensclo',
            Thickness: 'Moderate',
            Season: 'Summer',
            DesignElement: 'Embroidered, Pocket, Drawstring, Patchwork',
            FitType: 'Regular',
            Collection: 'Newchic',
        },
        rate: 5,
        price: '11',
        imgURLs: imageFilenames[10],
    },
    {
        productID: 12,
        name: 'Mens Ethnic Geometric Funny Face Pattern Patchwork Corduroy Shorts',
        description: {
            Type: 'Shorts',
            Occasion: 'Street',
            Color: 'Black',
            Pattern: 'Geometric Pattern, Color Block',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            Length: 'Short',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Spring',
            DesignElement: 'Patchwork, Drawstring, Pocket',
            FitType: 'Regular',
            Collection: 'Newchic',
        },
        rate: 5,
        price: '12',
        imgURLs: imageFilenames[11],
    },
   {
        productID: 13,
        name: 'Mens Solid Double Pocket Lapel Corduroy Long Sleeve Shirts',
        description: {
            Type: 'Shirts',
            Occasion: 'Daily',
            Color: 'Green',
            Pattern: 'Solid',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            Length: 'Long Sleeve',
            Brand: 'INCERUN',
            Thickness: 'Moderate',
            Season: 'Autumn',
            DesignElement: 'Pocket, Button',
            FitType: 'Regular',
            Collection: 'Newchic',
        },
        rate: 5,
        price: '13',
        imgURLs: imageFilenames[12],
    },
    {
        productID: 14,
        name: 'Mens Letter Graphics Curved Hem Casual Short Sleeve T-Shirts',
        description: {
            Type: 'T-Shirts',
            Occasion: 'Daily',
            Color: 'Red',
            Pattern: 'Geometric Pattern, Letter Print',
            Collar: 'Crew Neck',
            Material: 'Polyester',
            Length: 'Short Sleeve',
            Brand: 'ChArmkpR',
            Thickness: 'Moderate',
            Season: 'Summer',
            DesignElement: 'Print',
            FitType: 'Regular',
            Collection: 'Newchic',
        },
        rate: 5,
        price: '14',
        imgURLs: imageFilenames[13],
    },
    {
        productID: 15,
        name: 'Mens 100% Cotton Striped Breathable Casual Everyday Pants',
        description: {
            Type: 'Pants',
            Occasion: 'Daily',
            Color: 'Black',
            Pattern: 'Solid',
            Collar: 'Lapel Collar',
            Material: 'Cotton',
            Length: 'Long',
            Brand: 'Mensclo',
            Thickness: 'Moderate',
            Season: 'Summer',
            DesignElement: 'Drawstring, Pocket',
            FitType: 'Regular',
            Collection: 'Newchic',
        },
        rate: 5,
        price: '15',
        imgURLs: imageFilenames[14],
    },
    {
        productID: 16,
        name: 'Mens All Over Pineapple Floral Print Holiday Drawstring Short',
        description: {
            Type: 'Shorts',
            Occasion: 'Vacation',
            Color: 'Green',
            Pattern: 'Plants, Fruit, Tropical, Floral Print',
            Collar: 'Lapel Collar',
            Material: 'Polyester',
            Length: 'Short',
            Brand: 'KOYYE',
            Thickness: 'Moderate',
            Season: 'Summer',
            DesignElement: 'Pocket, Print, Drawstring',
            FitType: 'Loose',   
            Collection: 'Newchic',
        },
        rate: 5,
        price: '16',
        imgURLs: imageFilenames[15],
    }
];
