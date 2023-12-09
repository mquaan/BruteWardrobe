import React from 'react'
import '../styles/About.css'
function About(){
	return(
		<div class="AboutUs">
			<div class="heading">
				<h1>About us</h1>
				<p>Welcome to BruteWardrobe, where bold meets chic, and every piece of clothing is crafted to unleash your inner strength and style</p>
			</div>

			<div class="container">	
				<div class="about">
					<div class="about_image">
						<img src="../assets/features/about_pic.png"/>
					</div>
					<div class="about_content">
						<h3>Dress Your Best, Impress the Rest</h3>
						<p>
							Welcome to BruteWardrobe, where fashion meets passion and style becomes a statement. 
							At BruteWardrobe, we believe that clothing is more than just fabric; it's a reflection of your personality, your journey, and your individuality. 
							Our mission is to empower you to express yourself through what you wear, offering a curated collection that effortlessly blends trendsetting designs with timeless classics. 
							We are committed to providing a diverse range of high-quality pieces that cater to every taste and occasion. 
							Whether you're seeking the latest fashion trends or timeless wardrobe essentials, BruteWardrobe is your go-to destination for style that transcends boundaries. 
							Join us on this fashion-forward journey, and let your wardrobe tell your unique story. 
							Discover the perfect ensemble that not only complements your outer beauty but also boosts your inner confidence. 
							Welcome to a world where every stitch is infused with passion, and every piece is designed to make you stand out in the crowd.
						</p>
						<a href="#" class="read_more">Read More</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About
