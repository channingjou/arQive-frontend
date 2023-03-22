import React from "react";
import { useSelector } from "react-redux";

export default function PrivacyStatement() {
  const auth = useSelector((state) => state.auth);
  
  const { user } = auth;
  let authorized = false;
  if (user) {
    if (user.is_administrator || user.is_moderator) {
      authorized = true;
    }
  }

  return (
    <main className={"main-content-div"}>
        <h1>Privacy Policy for TheArqive.com</h1>
        <p>At <a href="https://thearqive.com">TheArqive.com</a>, we take the privacy and security of our users very seriously. This Privacy Policy outlines the types of information we collect and how we use, share, and protect that information.</p>

        <section>
            <h2>Information We Collect</h2>
            <p>We collect the following types of information from our users:</p>
            <ol>
                <li>Personal Information: We may collect personal information such as your name, email address, and location when you sign up for an account with us.</li>
                <li>User Content: We may collect user-generated content such as posts, comments, images, and videos that you submit to our website.</li>
                <li>Cookies and Tracking Information: We may use cookies, web beacons, and similar technologies to collect information about how you use our website, such as the pages you visit and the links you click.</li>
                <li>Log Data: Our servers automatically record information about how you use our website, including your IP address, browser type, operating system, and the date and time of your visit.</li>
            </ol>
        </section>

        <section>
            <h2>How We Use Your Information</h2>
            <p>We use your information to provide and improve our services, to communicate with you about your account, and to personalize your experience on our website. We may also use your information to:</p>
            <ol>
                <li>Respond to your requests and inquiries.</li>
                <li>Analyze user behavior and usage patterns to improve our website and services.</li>
                <li>Send you promotional materials and offers.</li>
                <li>Comply with legal obligations.</li>
            </ol>
        </section>

        <section>
            <h2>Sharing Your Information</h2> 
            <p>We may share your information with third-party service providers who help us provide and improve our services. We may also share your information with law enforcement agencies, government bodies, or other third parties when we are required to do so by law.</p>
        </section>

        <section>
            <h2>Protecting Your Information</h2>
            <p>We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. Therefore, we cannot guarantee the absolute security of your information.</p>
        </section>

        <section>
            <h2>Your Choices</h2>
            <p>You can control how we use your information by:</p>
            <ol>
                <li>Updating your account settings to manage your communication preferences.</li>
                <li>Disabling cookies in your browser settings.</li>
                <li>Deleting your account and all associated information.</li>
            </ol>
        </section>

        <section>
            <h2>Data Retention Practices</h2>
            <p>We will retain your personal information only for as long as necessary to provide you with our services and as required by law. When we no longer need to use your personal information, we will securely delete or destroy it.</p>
        </section>

        <section>
            <h2>Legal Basis for Processing</h2>
            <p>We process your personal information based on your consent and our legitimate business interests in providing and improving our services.</p>
            <p>User Rights You have the right to:</p>
            <ol>
                <li>Access and receive a copy of your personal information.</li>
                <li>Rectify any inaccurate or incomplete personal information.</li>
                <li>Object to the processing of your personal information.</li>
                <li>Erase your personal information in certain circumstances.</li>
                <li>Restrict the processing of your personal information in certain circumstances.</li>
                <li>Withdraw your consent at any time.</li>
            </ol>
        </section>

        <section>
            <h2>Complaints</h2>
            <p>If you have any concerns about our processing of your personal information, you have the right to lodge a complaint with the relevant data protection authority.</p>
        </section>

        <section>
            <h2>Questions and Concerns</h2>
            <p>If you have any questions or concerns about our Privacy Policy, please contact us at thearqive@gmail.com.</p>
        </section>

        <section>
        <h2>Additional Information</h2>
            <ul>
                <li>We do not knowingly collect personal information from children under the age of 13. If you are under 13, please do not provide us with any personal information.</li>
                <li>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website. Your continued use of our website after such modifications will constitute your agreement to the new terms.</li>
                <li>We may transfer your information to servers located in other countries for processing and storage. By using our website, you consent to the transfer of your information to countries outside of your country of residence.</li>
                <li>We may use third-party analytics and advertising services, such as Google Analytics and Google AdSense, to collect and analyze information about your use of our website. These third-party services may use cookies and other tracking technologies to collect information about your visits to our website and other websites. Please refer to the respective privacy policies of these third-party services for more information on how they collect and use your information.</li>
                <li>Our website may contain links to third-party websites and services that are not owned or controlled by us. We are not responsible for the privacy practices or content of these third-party websites and services. We encourage you to review the privacy policies of these third-party websites and services before providing them with any personal information.</li>
                <li>We may use your information to contact you with newsletters, marketing or promotional materials, and other information that may be of interest to you. You may opt-out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.</li>
            </ul>
        </section>

        <p>If you have any questions or concerns about our Privacy Policy, please do not hesitate to contact us at thearqive@gmail.com</p>
    </main>
  );
}