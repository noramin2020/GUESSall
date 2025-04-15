import React from 'react';
import { useNavigate } from 'react-router-dom';
import guessLogo from '../assets/guess_logo1.png'; // Import the logo image

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
      <div className="text-center">
        <img src={guessLogo} alt="Guess Logo" className="w-45 h-24 mx-auto mb-4" /> {/* Center logo */}
        <p className="text-4xl font-bold">
          Welcome to Guess Wi-Fi
        </p>
        <p className="mt-4 text-xl italic">
          "Connecting Students, Excluding Intruders"
        </p>
        <p className="mt-4 text-justify px-8">
          Welcome to our university's exclusive Wi-Fi network, Guess Wi-Fi! Designed specifically for our
          esteemed students, Guess Wi-Fi offers a secure and reliable wireless connection within our vibrant campus environment.
          Guess Wi-Fi is a closed network accessible only to registered university students, ensuring that your
          activities remain private and secure. We understand the importance of a fast and uninterrupted internet
          connection, especially in educational settings. That's why we've dedicated robust resources to provide
          you with a seamless online experience.
        </p>
        <p className="mt-4 text-justify px-8">
          At our university, we value the importance of fostering a connected and collaborative community. Guess Wi-Fi plays
          a vital role in creating an environment where students can thrive academically and engage with their peers.
          Enjoy the benefits of a dedicated network designed exclusively for you, enabling you to make the most of your university experience.
        </p>
        <div className="mt-8 px-8">
          <p className="font-semibold text-lg">
            Researchers and Developers:
          </p>
          <p className="mt-2 text-justify">
            Nor-Amin Hadji Ali
          </p>
          <p className="mt-2 text-justify">
            Mohammad Ryan Saaban
          </p>
          <p className="mt-4 font-semibold text-lg">
            Advisers:
          </p>
          <p className="mt-2 text-justify">
            Joseph Sieras
          </p>
          <p className="mt-2 text-justify">
            Mohammad Domato
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
