import { redirect } from "next/navigation";
import prisma from "./db";
// Fetch with UNIQUE IDENTFIER
export const fetchFeaturedProducts = async () => {
  const featuredProducts = await prisma.product.findMany({
    where: {
      featured: true,
    },
  });
  return featuredProducts;
};
// Alt way
export const fetchAllProducts = ({ search = "" }: { search: string }) => {
  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSingleProduct = async (productId: string) => {
  const singleProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!singleProduct) {
    return redirect("/products");
  }
  return singleProduct;
};
