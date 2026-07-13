import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seedProducts = async () => {
  const count = await prisma.product.count();
  if (count === 0) {
    await prisma.product.createMany({
      data: [
        { title: "Product 1", price: 500, description: "Description 1" },
        { title: "Product 2", price: 700, description: "Description 2" },
        { title: "Product 3", price: 1000, description: "Description 3" },
      ],
    });
  }
};

// Run seed if needed
seedProducts();

export async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return prisma.product.findMany();
}

export async function getProduct(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function addProduct(
  title: string,
  price: number,
  description: string
) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return prisma.product.create({
    data: { title, price, description },
  });
}

export async function updateProduct(
  id: number,
  title: string,
  price: number,
  description: string
) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return prisma.product.update({
    where: { id },
    data: { title, price, description },
  });
}

export async function deleteProduct(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return prisma.product.delete({
    where: { id },
  });
}
