import clientPromise from "@/lib/mongodb";

async function fixProducts() {
  try {
    const client = await clientPromise;
    const db = client.db("test"); // change if your DB name is different

    const products = await db.collection("products").find({}).toArray();

    for (const p of products) {
      const updatedPrice = Number(p.price);
      const updatedStock = Number(p.stock);

      // Only update if needed
      if (isNaN(updatedPrice) || isNaN(updatedStock)) {
        console.log(`Skipping invalid product: ${p._id}`);
        continue;
      }

      await db.collection("products").updateOne(
        { _id: p._id },
        {
          $set: {
            price: updatedPrice,
            stock: updatedStock,
          },
        }
      );

      console.log(`Updated product: ${p._id} ✅`);
    }

    console.log("All products fixed ✅");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing products:", error);
    process.exit(1);
  }
}

fixProducts();
