import { Link } from "react-router-dom";

import errorImage from "../../../assets/CodePen-404-Page.gif";

const NotFound = () => {
  return (
    <div className="min-h-screen flex mx-auto items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          <img src={errorImage} alt="" />
        </h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Link to="/dashboard">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
            Return to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
