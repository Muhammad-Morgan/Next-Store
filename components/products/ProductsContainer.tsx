import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchAllProducts } from "@/lib/utils/actions";
import Link from "next/link";

const ProductsContainer = async ({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) => {
  const products = await fetchAllProducts({ search });
  const total = products.length;
  const searchTerm = search ? `&search=${search}` : "";

  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {total} product{total > 1 ? "s" : ""}
          </h4>
          <div className="flex gap-x-4">
            <Button
              size={"icon"}
              asChild
              variant={layout === "grid" ? "default" : "ghost"}
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              size={"icon"}
              asChild
              variant={layout === "list" ? "default" : "ghost"}
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* PRODUCTS */}
      <div>
        {total === 0 ? (
          <h5 className="text-3xl mt-16">
            Sorry no products match your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
