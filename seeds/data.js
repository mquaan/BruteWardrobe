import * as fs from 'fs/promises';
export const customers = [
	{
		username: 'customer',
		password: 'customer',
		email: 'customer@gmail.com',
	},
	{
		username: 'stevenblake',
		password: 'B$J:*2a,hL|=',
		email: 'stevenblake@gmail.com',
	},
	{
		username: 'philipcooper',
		password: 'mSCtmRMAb^s`',
		email: 'philipcooper@gmail.com',
	},
	{
		username: 'wmoran',
		password: 'ZO.J{q&q7u)$',
		email: 'wmoran@gmail.com',
	},
	{
		username: 'christopher62',
		password: 'Q*5&B=ds,RO?',
		email: 'christopher62@gmail.com',
	},
	{
		username: 'greenjesus',
		password: 'Pe=:m;^-G_?F',
		email: 'greenjesus@gmail.com',
	},
	{
		username: 'cdillon',
		password: '>dy,[?oR`mP9',
		email: 'cdillon@gmail.com',
	},
	{
		username: 'johnnielsen',
		password: 'U@\\w!Mo)W/J+',
		email: 'johnnielsen@gmail.com',
	},
	{
		username: 'stacy53',
		password: '4@NU,3~ucKDq',
		email: 'stacy53@gmail.com',
	},
	{
		username: 'ucollier',
		password: 'SQ|pi-9Fwh?[',
		email: 'ucollier@gmail.com',
	},
];

export const merchants = [
	{
		username: 'merchant',
		password: 'merchant',
		email: 'twashington@gmail.com',
	},
	{
		username: 'helloworld',
		password: 'B$J:*2a,hL|=',
		email: 'stevenblake@gmail.com',
	},
];

export const admins = [
	{
		username: 'admin1',
		password: 'admin1',
		email: 'admin1@gmail.com',
	},
	{
		username: 'admin2',
		password: 'admin2',
		email: 'admin2@gmail.com',
	},
];

var imageFilenames = [];

try {
	const data = await fs.readFile('seeds/imageURLs.txt');
	let strdata = data.toString();
	let groups = strdata.split(',\r\n');
	// Initialize an empty 2D array
	// Loop through each group
	for (let group of groups) {
		// Split each group into separate links and add to the 2D array
		imageFilenames.push(group.split('\n'));
	}
} catch (err) {
	console.error('Error reading file:', err);
	process.exit(1);
}

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
			Collection: 'Mensclo',
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
			Collection: 'Newchic',
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
			Collection: 'Newchic',
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
			Collection: 'Newchic',
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
			Collection: 'Newchic',
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
			Collection: 'Newchic',
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
	},
];
