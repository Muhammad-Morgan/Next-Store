import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchUserFavorites } from "@/lib/utils/actions";

const FavoritesPage = async () => {
  const favorites = await fetchUserFavorites();
  if (favorites.length === 0)
    return <SectionTitle text="no items in the favorites" />;
  return (
    <div>
      <SectionTitle text="favorites" />
      <ProductsGrid products={favorites.map((fav) => fav.product)} />
    </div>
  );
};

export default FavoritesPage;
