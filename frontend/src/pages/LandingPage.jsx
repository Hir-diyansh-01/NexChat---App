import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to NexChat 🚀</h1>
      <p className="mb-8 text-gray-400">
        Connect with friends instantly and securely.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;