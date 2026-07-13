import { getProducts } from "@/prisma-db";
import { unstable_cache } from "next/cache";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string | null;
};

const getProductsWithCache = unstable_cache(getProducts);

export default async function PrismaProductsPage() {
  const products: Product[] = await getProductsWithCache();
  return (
    <ul className="space-y-4 p-4">
      {products.map((product) => (
        <li
          key={product.id}
          className="p-4 bg-white shadow-md rounded-lg text-gray-700"
        >
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p>{product.description}</p>
          <p className="text-lg font-medium">${product.price}</p>
        </li>
      ))}
    </ul>
  );
}
