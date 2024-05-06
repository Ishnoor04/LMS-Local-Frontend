"use client";
import React, { use, useState } from "react";
import Heading from "../utils/Heading";
import FAQ from "../components/FAQ/FAQ";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="About Us - Elearning"
        description="Description1"
        keywords="Programming, MERN, Redux"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={2}
        route={route}
        setRoute={setRoute}
      />
      <div className="text-[22px] mx-20 my-10 text-justify text-black dark:text-white">
      <div className="about-us">
      <h2 className="mb-12 pb-4 text-center text-[42px] font-bold text-gradient">About Us</h2>

      <p>Welcome to <span className="brand-name">MindMeld</span>, a cutting-edge Learning Management System designed to empower educators and learners alike. At <span className="brand-name">MindMeld</span>, we are passionate about revolutionizing the way knowledge is shared, acquired, and applied in todays dynamic world.</p>
      
      <h3 className="m-12 text-center text-[36px] font-bold text-gradient">Our Mission</h3>
      <p>Our mission is to provide a comprehensive and user-friendly platform that facilitates seamless teaching and learning experiences for institutions, instructors, and students worldwide. We strive to empower educators with innovative tools and resources to engage learners effectively, foster collaboration, and inspire lifelong learning.</p>
      
      <h3 className="m-12 text-center text-[36px] font-bold text-gradient">What Sets Us Apart</h3>
      <p>At <span className="brand-name">MindMeld</span>, we differentiate ourselves through our commitment to excellence, innovation, and user satisfaction. Here is what sets us apart:</p>
      <ul>
        <li><strong>Intuitive Design:</strong> We prioritize user experience, offering an intuitive interface and robust features that make navigating the platform effortless for both educators and learners.</li>
        <li><strong>Scalability:</strong> Whether you are a small educational institution or a large enterprise, our LMS is scalable to meet your needs, accommodating growth and expansion without compromising performance.</li>
        <li><strong>Customization:</strong> We understand that every institution and learner is unique. That is why we offer customizable solutions tailored to your specific requirements, ensuring a personalized learning experience for all users.</li>
        <li><strong>Reliability and Security:</strong> Your trust is paramount to us. We employ the latest security protocols and data encryption techniques to safeguard your information and ensure a secure learning environment.</li>
        <li><strong>Continuous Improvement:</strong> We are committed to continuous improvement, regularly updating our platform with new features, enhancements, and optimizations based on user feedback and emerging trends in education technology.</li>
      </ul>
      
      <h3 className="m-12 text-center text-[36px] font-bold text-gradient">Our Team</h3>
      <p>Behind <span className="brand-name">MindMeld</span> is a dedicated team of experts passionate about education and technology. From software developers and user experience designers to educators and support specialists, our diverse team collaborates tirelessly to deliver a world-class LMS experience.</p>
      
      <h3 className="m-12 text-center text-[36px] font-bold text-gradient">Get Started Today</h3>
      <p>Join the <span className="brand-name">MindMeld</span> community today and unlock a world of possibilities in education. Whether you are a teacher looking to engage your students more effectively, an institution seeking to streamline your learning processes, or a learner eager to expand your horizons, we are here to support you every step of the way.</p>
      <p>Experience the future of learning with <span className="brand-name">MindMeld</span>. Together, let us inspire, innovate, and transform education for generations to come.</p>
    </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
