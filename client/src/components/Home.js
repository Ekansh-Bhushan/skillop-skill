
// import "../App\"
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const style = {
    "display": "unset",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  background: "#fff",
  color: "#000",
  fontSize: "15px",
  lineHeight: 1.5,
  overflow:"scroll"
}
const Home=()=>{
    const navigate = useNavigate();
    let userType = JSON.parse(localStorage.getItem("userType"));

    useEffect(() => {
        for (var key in style) {
            window.document.body.style[key] = style[key];
        }

        const auth = localStorage.getItem('auth');
        const user = localStorage.getItem('user');
        const userData = JSON.parse(user);
        // console.log(authData.step1);
        if (auth) {
            if (!userData.step1) {
                navigate('/expertise');
            }
            else if (!userData.step2 && userType === "mentor") {
                navigate('/slots');
            } else if (!userData.step3) {
                navigate('/about');
            } else {
                // console.log(auth);
                navigate('/main')
            }
        }
        return () => {
            window.document.body.style[key] = '';
        }
    }, [style])
    return(
        <div className="home">
            <div class="menu-btn">
    <i class="fas fa-bars fa-2x"></i>
  </div>

  <div class="container">
    {/* <!-- Nav --> */}
    <nav class="main-nav">
      <img src="https://raw.githubusercontent.com/Ekansh-Bhushan/skillop-skill/main/client/public/Img/logo.png" alt="Skillop" class="logo"/>

      <ul class="main-menu">
        
        <li><a href="/">About Us</a></li>
        <li><a href="/">Contact</a></li>
        <li><a href="/">Help</a></li>
        <li><a href="/signup">Become a Mentor</a></li>
        <li><a href="/signup">Find a Mentor</a></li>
      </ul>

      {/* <ul class="right-menu">
        <li>
          <a href="/">
            <i class="fas fa-search"></i>
          </a>
        </li>
        <li>
          <a href="/">
            <i class="fas fa-shopping-cart"></i>
          </a>
        </li>
      </ul> */}
    </nav>

    {/* <!-- Showcase --> */}
    <header class="showcase">
      {/* <!-- <h2 class="title">SKILLOP</h2> --> */}
      <h2>
            <span id="s_head">S</span>
            <span id="k_head">K</span>
            <span id="i_head">I</span>
            <span id="l1_head">L</span>
            <span id="l2_head">L</span>
            <span id="o_head">O</span>
            <span id="p_head">P</span>
         </h2>
      <p style={{fontWeight:500,}}>
        Shuru se sheruaat karte hai
      </p>
      <a href="/signup" class="btn" style={{padding: "0.75rem",
    display: "block",
    textDecoration: "none",
    backgroundColor: "rgb(71 71 71)",
    color: "#f3f3f3",
    textAlign: "center",
    borderRadius: "0.25rem",
    cursor: "pointer",
    transition: "0.3s",
    paddingLeft: "1rem",
    paddingRight: "1rem",}} >
        Join Us <i class="fas fa-chevron-right"></i>
      </a>
    </header>

    {/* <!-- Home cards 1 --> */}
    <section class="home-cards">
      <div>
        <img src="https://raw.githubusercontent.com/Ekansh-Bhushan/skillop-skill/main/client/public/Img/3.jpg" alt=""/>
        <h3>Gaurav Sharma</h3>
        <p>
       	A highly intelligent student in DTU.
        </p>
        <a href="/signup">View Profile <i class="fas fa-chevron-right"></i></a>
      </div>
      <div>
        <img src="https://raw.githubusercontent.com/Ekansh-Bhushan/skillop-skill/main/client/public/Img/1.jpg" alt="" />
        <h3>Harsh Vardhan</h3>
        <p>
       Meet Harsh Vardhan, the Vice President and Corporate Head (Co-founder) of Society SkillOP. With a wealth of experience in marketing, Harsh has played a pivotal role in driving the team's growth and success. His strategic insights, innovative thinking, and dedication to excellence have made him a key driving force behind our achievements. Harsh's commitment to fostering skill development and his exceptional leadership qualities make him an invaluable asset to our team
        </p>
        <a href="/signup">View Profile <i class="fas fa-chevron-right"></i></a>
      </div>
      <div>
        <img src="https://raw.githubusercontent.com/Ekansh-Bhushan/skillop-skill/main/client/public/Img/4.jpg" alt="" />
        <h3>Pratham Mehra</h3>
        <p>
	Introducing Pratham Mehra, the AIML Head of Society SkillOP. With a year of hands-on experience in Python coding, Pratham brings technical prowess and a passion for artificial intelligence and machine learning to our team. Currently in his second year of the Electronics and Communication Engineering program at Delhi Technological University, Pratham exemplifies the fusion of academic excellence and practical skill. His dedication to advancing AI technologies and his academic journey make him an integral part of our innovative endeavors.
        </p>
        <a href="/signup">View Profile <i class="fas fa-chevron-right"></i></a>
      </div>
      <div>
        <img src="https://raw.githubusercontent.com/Ekansh-Bhushan/skillop-skill/main/client/public/Img/2.jpg" alt="" />
        <h3>Kartik Walia</h3>
        <p>
        A Second year undergraduate student pursing degree in Btech from DTU and a highly active in making WebD.
        </p>
        <a href="/signup">View Profile <i class="fas fa-chevron-right"></i></a>
      </div>
    </section>

    {/* <!-- Xbox --> */}
    <section class="xbox">
      <div class="content">
        <h2>Why Mentors Choose us?</h2>
        <p><ul>
            <li>Build your page</li>
            <li>Build Your community</li>
            <li>Engage and Earn</li>
            </ul></p>
          <a href="/signup" class="btn"  style={{padding: "0.75rem",
    display: "block",
    textDecoration: "none",
    backgroundColor: "rgb(71 71 71)",
    color: "#f3f3f3",
    textAlign: "center",
    borderRadius: "0.25rem",
    cursor: "pointer",
    transition: "0.3s",
    paddingLeft: "1rem",
    paddingRight: "1rem",
width: "120px"}} > 	
            Apply Now <i class="fas fa-chevron-right"></i>
          </a>
      </div>
    </section>

    {/* <!-- Home cards 2 --> */}
			<section class="home-cards">
				<div>
					<img src="https://raw.githubusercontent.com/Ekansh-Bhushan/skillop-skill/main/client/public/Img/58.jpeg" alt="" />
					{/* <!-- <h3>xyz</h3> -->
					<!-- <p>
						FSRGKMSGHJFOKGMJSLKFOPSME
            KFKmfoksdpkfgpsmdkgsokgp
            dfkgfdopkgdgkdfmkgmdgkmkf
					</p> -->
					<!-- <a href="/">Stories <i class="fas fa-chevron-right"></i></a> --> */}
				</div>
				<div>
					<img src="https://raw.githubusercontent.com/Ekansh-Bhushan/skillop-skill/main/client/public/Img/57.jpeg" alt="" />
					{/* <!-- <h3>xyz</h3> -->
					<!-- <p>
						FSRGKMSGHJFOKGMJSLKFOP
            SMEKFKmfoksdpkfgpsmdkgsok
            gpdfkgfdopkgdgkdfmkgmdgkmkf
					</p> --> */}
					{/* <!-- <a href="/">Stories <i class="fas fa-chevron-right"></i></a> --> */}
				</div>
				<div>
					<img src="https://raw.githubusercontent.com/Ekansh-Bhushan/skillop-skill/main/client/public/Img/56.jpeg" alt="" />
					{/* <!-- <h3>xyz</h3> -->
					<!-- <p>
						FSRGKMSGHJFOKGMJSLKFOPSMEK
            FKmfoksdpkfgpsmdkgsokgpdf
            kgfdopkgdgkdfmkgmdgkmkf
					</p> --> */}
					{/* <!-- <a href="/">Stories <i class="fas fa-chevron-right"></i></a> --> */}
				</div>
				<div>
					<img src="https://raw.githubusercontent.com/Ekansh-Bhushan/skillop-skill/main/client/public/Img/55.jpeg" alt="" />
					{/* <!-- <h3>xyz</h3> --> */}
					{/* <!-- <p>
						FSRGKMSGHJFOKGMJSLKFOPSMEKF
            Kmfoksdpkfgpsmdkgsokgpdfkg
            fdopkgdgkdfmkgmdgkmkf
					</p> --> */}
					{/* <!-- <a href="/">Stories <i class="fas fa-chevron-right"></i></a> --> */}
				</div>
      </section>
      
      {/* <!-- Carbon --> */}
      <section class="carbon dark">
        <div class="content">
          <h2>Why Mentees Choose us?</h2>
          <p>Get the best mentor for all subjects</p>
            <a href="/signup" class="btn">
              Book Now <i class="fas fa-chevron-right"></i>
            </a>
        </div>
      </section>

      {/* <!-- Follow --> */}
      <section class="follow">
        <p>Follow SKILLOP</p>
        <a href="https://instagram.com/skillop.skill">
          <img src="https://cdn.icon-icons.com/icons2/1584/PNG/64/3721672-instagram_108066.png" alt="Facebook"/>
        </a>
        {/* <a href="https://twitter.com">
          <img src="https://i.ibb.co/vJvbLwm/social-twitter.png" alt="Twitter"/>
        </a>
        <a href="https://linkedin.com">
          <img src="https://i.ibb.co/b30HMhR/social-linkedin.png" alt="Linkedin"/>
        </a> */}
      </section>
    </div>
      {/* <!-- Links --> */}
      <section class="links">
        <div class="links-inner">
          <ul>
            <li><h3>SkillOP</h3></li>
            <li><a href="/">Terms of service </a></li>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="/">Contact Us</a></li>
            <li><a href="/">Email: admin@skillop.in</a></li>
            <li><a href="/">Phone: 9818807886</a></li> 
          </ul>
          <ul>
            <li><h3>Become a mentee</h3></li>
            <li><a href="/">Build your profile</a></li>
            <li><a href="/">Give Help</a></li>
            <li><a href="/">Grab internship</a></li> 
          </ul>
          <ul>
            <li><h3>Become a mentor</h3></li>
            <li><a href="/">Build your page</a></li>
            <li><a href="/">Find your way</a></li>
            <li><a href="/">Your community</a></li>
            <li><a href="/signup">Signup</a></li>
            {/* <li><a href="/">GJGJJG</a></li> */}
          </ul>
          <ul>
            {/* <!-- <li><h3>Enterprise</h3></li>
            <li><a href="/">Azure</a></li>
            <li><a href="/">AppSource</a></li>
            <li><a href="/">Automotive</a></li>
            <li><a href="/">Government</a></li>
            <li><a href="/">Healthcare</a></li> --> */}
          </ul>
          <ul>
            {/* <!-- <li><h3>Developer</h3></li>
            <li><a href="/">Visual Studio</a></li>
            <li><a href="/">Windowszs Dev Center</a></li>
            <li><a href="/">Developer Network</a></li>
            <li><a href="/">TechNet</a></li>
            <li><a href="/">Microsoft Developer</a></li> --> */}
          </ul>
          <ul>
            {/* <!-- <li><h3>Company</h3></li>
            <li><a href="/">Careers</a></li>
            <li><a href="/">About Microsoft</a></li>
            <li><a href="/">Company news</a></li>
            <li><a href="/">Privacy at Microsoft</a></li>
            <li><a href="/">Inverstors</a></li> --> */}
          </ul>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <footer class="footer">
        <div class="footer-inner">
          <div><i class="fas fa-globe fa-2x"></i> English (United States)</div>
          <ul>
            {/* <!-- <li><a href="/">Sitemap</a></li>
					<li><a href="/">Contact Microsoft</a></li>
					<li><a href="/">Privacy & cookies</a></li>
					<li><a href="/">Terms of use</a></li>
					<li><a href="/">Trademarks</a></li>
					<li><a href="/">Safety & eco</a></li>
					<li><a href="/">About our ads</a></li>
					<li><a href="/">&copy; Microsoft 2020</a></li> --> */}
          </ul>
        </div>
      </footer>
        </div>
    )
}

export default Home;
