import React from 'react';
import { Printer, Truck, Book, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Check if the user is signed in by looking for a key in sessionStorage
  const isUserSignedIn = !!sessionStorage.getItem('userToken'); // Adjust the key as per your application logic

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-800">Inkmudra</div>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#" className="text-gray-500 font-semibold hover:text-gray-800">Home</a></li>
                <li><a href="#" className="text-gray-500 font-semibold hover:text-gray-800">Services</a></li>
                <li><a href="#" className="text-gray-500 font-semibold hover:text-gray-800">Contact</a></li>
                {/* Conditional Rendering */}
                {isUserSignedIn ? (
                  <li><Link to="/form" className="text-gray-500 font-semibold hover:text-gray-800">Form</Link></li>
                ) : (
                  <>
                    <li><Link to="signup" className="text-gray-500 font-semibold hover:text-gray-800">Sign up</Link></li>
                    <li><Link to="signin" className="text-gray-500 font-semibold hover:text-gray-800">Sign In</Link></li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Print & Deliver to Your Doorstep</h1>
          <p className="text-xl mb-8">Send us your documents and college blackbooks. We'll print and deliver them right to you!</p>
          <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded-full hover:bg-gray-100 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FileText size={40} />}
              title="Document Printing"
              description="High-quality printing for all your document needs"
            />
            <FeatureCard
              icon={<Book size={40} />}
              title="Blackbook Printing"
              description="Specialized printing for college blackbooks"
            />
            <FeatureCard
              icon={<Printer size={40} />}
              title="Fast Turnaround"
              description="Quick printing process to save your time"
            />
            <FeatureCard
              icon={<Truck size={40} />}
              title="Doorstep Delivery"
              description="Convenient delivery right to your doorstep"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Company</h5>
              <ul className="mb-4">
                <li className="mt-2"><a href="#" className="hover:underline">About</a></li>
                <li className="mt-2"><a href="#" className="hover:underline">Careers</a></li>
                <li className="mt-2"><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Legal</h5>
              <ul className="mb-4">
                <li className="mt-2"><a href="#" className="hover:underline">Terms</a></li>
                <li className="mt-2"><a href="#" className="hover:underline">Privacy</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Social</h5>
              <ul className="mb-4">
                <li className="mt-2"><a href="#" className="hover:underline">Facebook</a></li>
                <li className="mt-2"><a href="#" className="hover:underline">Instagram</a></li>
                <li className="mt-2"><a href="#" className="hover:underline">Twitter</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Company</h5>
              <p className="mb-4">
                Subscribe to our newsletter to get latest updates and offers.
              </p>
              <div className="flex mt-4">
                <input type="text" className="p-2 border text-black border-gray-600 round-l-lg w-full rounded-s-lg" placeholder="Email Address" />
                <button className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition duration-300">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default LandingPage;
