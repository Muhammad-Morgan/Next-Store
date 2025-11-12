import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";
import { fetchOrCreateCart, updateCart } from "@/lib/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CartPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/");
  const prevCart = await fetchOrCreateCart({ userId });
  const { currentCart, cartItems } = await updateCart(prevCart);
  if (cartItems.length === 0) return <SectionTitle text="empty cart" />;
  return (
    <>
      <SectionTitle text="shopping cart" />
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList cartItems={cartItems} />
        </div>
        <div className="lg:col-span-4">
          <CartTotals cart={currentCart} />
        </div>
      </div>
    </>
  );
};

export default CartPage;
