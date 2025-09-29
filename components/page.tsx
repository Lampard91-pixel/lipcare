import NewProductForm from "@/components/admin/NewProductForm";

export default function NewProductPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-cyan-900">Add New Product</h1>
        <p className="text-gray-500 mt-1">
          Fill in the details below to add a new product to your store.
        </p>
      </div>
      <NewProductForm />
    </div>
  );
}