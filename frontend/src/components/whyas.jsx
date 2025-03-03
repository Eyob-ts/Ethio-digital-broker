import image from "../assets/image/happy2.jpg"
import { FaCheckCircle, FaShieldAlt, FaHandshake } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-12 bg-gradient-to-r from-indigo-200 via-slate-100 to-indigo-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      
      {/* Left Side - Image */}
      <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
        <img
          src={image}
          alt="Why Choose Us"
          className="rounded-lg shadow-2xl object-cover w-full h-full max-h-96"
        />
      </div>

      {/* Right Side - Explanation */}
      <div className="w-full lg:w-1/2 lg:pl-12">
        <h2 className="text-2xl lg:text-3xl font-oxygen text-gray-800 dark:text-white mb-6">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 font-thin">
          At Ethio Digital Broker, we prioritize providing exceptional service to our users. Our platform is designed to connect buyers and sellers efficiently, ensuring a seamless experience for everyone.
        </p>
        <ul className="space-y-4 p-4">
          <li className="flex items-start p-5 border border-spacing-5 bg-indigo-200 dark:bg-gray-700 shadow transition-colors">
            <FaCheckCircle className="text-green-500 dark:text-green-400 text-xl mr-4" />
            <span className="text-gray-700 dark:text-gray-200 text-lg font-robotoMono">Trusted and Verified Brokers</span>
          </li>
          <li className="flex items-start p-5 border border-spacing-5 bg-indigo-200 dark:bg-gray-700 drop-shadow-sm transition-colors">
            <FaShieldAlt className="text-blue-500 dark:text-blue-400 text-xl mr-4" />
            <span className="text-gray-700 dark:text-gray-200 text-lg font-robotoMono">Secure and Transparent Process</span>
          </li>
          <li className="flex items-start p-5 border border-spacing-5 bg-indigo-200 dark:bg-gray-700 drop-shadow-sm transition-colors">
            <FaHandshake className="text-yellow-500 dark:text-yellow-400 text-xl mr-4" />
            <span className="text-gray-700 dark:text-gray-200 text-lg font-robotoMono">Wide Range of Categories</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseUs;
