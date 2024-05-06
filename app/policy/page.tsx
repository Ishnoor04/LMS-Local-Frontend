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
        title="Policy - Elearning"
        description="Description1"
        keywords="Programming, MERN, Redux"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={3}
        route={route}
        setRoute={setRoute}
      />
      <div className="text-[22px] mx-20 my-10 text-justify text-black dark:text-white">
        <h2 className="mb-12 pb-4 text-center text-[42px] font-bold text-gradient">Policy</h2>
        1. Access Control Policy: Define who has access to the LMS, including
        students, instructors, administrators, and other stakeholders. Specify
        how access is granted, revoked, and managed. <br /> 2. Data Privacy
        Policy: Clearly outline how user data is collected, stored, used, and
        protected within the LMS. Ensure compliance with relevant data
        protection laws such as GDPR or CCPA. <br /> 3. Content Usage Policy:
        Detail guidelines for creating, uploading, and sharing content within
        the LMS. Address copyright issues, plagiarism, and acceptable use of
        multimedia materials. <br />
        4. User Conduct Policy: Establish rules for appropriate behavior and
        interaction within the LMS, including guidelines for respectful
        communication, academic integrity, and consequences for misconduct.
        <br /> 5. Security Policy: Specify measures to safeguard the LMS against
        unauthorized access, data breaches, malware, and other security threats.
        Include password policies, encryption standards, and regular security
        audits. <br /> 6. Accessibility Policy: Ensure that the LMS is
        accessible to users with disabilities by adhering to accessibility
        standards such as WCAG (Web Content Accessibility Guidelines). <br /> 7.
        Support Policy: Outline the procedures for providing technical support,
        including help desk services, troubleshooting guides, and escalation
        processes for resolving issues.
      </div>
      <Footer />
    </div>
  );
};

export default Page;
