// We need to acces searchParams. We need to get values from URL
// In the NavSearch file we are going to navigate to the products pages and provide search values
// In products page we access them.

import ProductsContainer from "@/components/products/ProductsContainer";

const ProductsPage = ({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) => {
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";

  return <ProductsContainer layout={layout} search={search} />;
};

export default ProductsPage;
