export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Welcome back! Here you can manage your products, orders, and customers.
        </p>
      </div>
      <div className="mt-8">
        {/* Add dashboard widgets and stats here */}
        <p className="text-gray-700">Your dashboard content will go here.</p>
      </div>
    </div>
  );
}