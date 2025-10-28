import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard content */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Card 1</h2>
            <p className="text-gray-600">Dashboard content goes here</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
