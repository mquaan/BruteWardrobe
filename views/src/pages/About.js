import React from 'react'
import '../styles/About.css'

function About() {
  return(
		<div class="AboutUs">
			<section className="about-header">
                <h2>#aboutus</h2>
                <h3>Welcome to BruteWardrobe</h3>
            </section>

			<section id="about-head" className="section-p1">
				<img src="../assets/banners/b17.png" alt=""/>
				<div>
					<h2>Who We Are?</h2>
					<p> Welcome to BruteWardrobe, where fashion meets passion and style becomes a statement. 
						At BruteWardrobe, we believe that clothing is more than just fabric; it's a reflection of your personality, your journey, and your individuality. 
						Our mission is to empower you to express yourself through what you wear, offering a curated collection that effortlessly blends trendsetting designs with timeless classics. 
						We are committed to providing a diverse range of high-quality pieces that cater to every taste and occasion. 
						Whether you're seeking the latest fashion trends or timeless wardrobe essentials, BruteWardrobe is your go-to destination for style that transcends boundaries. 
						Join us on this fashion-forward journey, and let your wardrobe tell your unique story. 
						Discover the perfect ensemble that not only complements your outer beauty but also boosts your inner confidence. 
						Welcome to a world where every stitch is infused with passion, and every piece is designed to make you stand out in the crowd.</p>
				</div>
			</section>

			<section id="contact-details" className='section-p1'>
				<div className='details'>
					<span>GET IN TOUCH</span>
					<h2>Visit or contact us today</h2>
					<h3>Head Office</h3>
					<div>
						<li>
							<i className="fal fa-map"></i>
							<p>Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM, 227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh</p>
						</li>
						<li>
							<i className="fal fa-envelope"></i>
							<p>abc@gmail.com</p>
						</li>
						<li>
							<i className="fal fa-phone-alt"></i>
							<p>0123456789</p>
						</li>
						<li>
							<i className="fal fa-clock"></i>
							<p>Monday to Saturday: 8.00am to 17.pm</p>
						</li>
					</div>
				</div>
				<div className='map'>
					<iframe
						title="HCMUS Location"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6317113141245!2d106.67990747316922!3d10.762840859447998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1702459119699!5m2!1svi!2s"
						style={{ border: 0 }}
						allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade">
					</iframe>
				</div>
			</section>
			{/* <div class="heading">
				<p>Welcome to BruteWardrobe, where bold meets chic, and every piece of clothing is crafted to unleash your inner strength and style</p>
			</div>
      		<div class="container">	
				<div class="about">
					<div class="about_image">
						<img src="../assets/Logo.png" alt=""/>
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
						<div class="read_more">Read More</div>
					</div>
				</div>
			</div> */}
		</div>
	)
}

export default About