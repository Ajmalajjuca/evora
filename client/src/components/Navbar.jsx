import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">
          conekt-lab
        </div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
