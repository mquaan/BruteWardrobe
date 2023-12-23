import { cloudinary } from '../cloudinary/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
	['p16', 'p16_s1', 'p16_s2', 'p16_s3'],
];

for (let i = 0; i < imageFilenames.length; i++) {
	for (let j = 0; j < imageFilenames[i].length; j++) {
		let imagePath = path.join(__dirname, `../views/src/assets/products/${imageFilenames[i][j]}.jpg`);

		if (fs.existsSync(imagePath)) {
			await cloudinary.uploader.upload(imagePath, { folder: 'BruteWardrobe' }, function (error, result) {
				console.log(result, error);
				fs.appendFile('imageURLs.txt', result.url + (j !== 3 ? '\n' : ',\n'), (err) => {
					if (err) console.error(err);
					else console.log('Data appended successfully');
				});
			});
		} else {
			console.log(`File does not exist: ${imagePath}`);
		}
	}
}

console.log('done');
