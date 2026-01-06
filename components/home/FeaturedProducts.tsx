import { fetchFeaturedProducts } from "@/lib/utils/actions";
import EmtpyList from "../global/EmtpyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";
import { Product } from "@prisma/client";

async function FeaturedProducts() {
  const featuredProducts: Product[] = await fetchFeaturedProducts();

  if (featuredProducts.length === 0) {
    return <EmtpyList />;
  }
  return (
    <section className="pt-24">
      <SectionTitle text="featured products" />
      <ProductsGrid products={featuredProducts} />
    </section>
  );
}

export default FeaturedProducts;
