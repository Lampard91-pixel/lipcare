export interface Customer {
  _id?: string;
  name: string;
  email: string;
  orders: number;
}

export async function getCustomers(): Promise<Customer[]> {
  const res = await fetch("/api/customers");
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}

export async function addCustomer(customer: Omit<Customer, "_id">): Promise<Customer> {
  const res = await fetch("/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  if (!res.ok) throw new Error("Failed to add customer");
  return res.json();
}


