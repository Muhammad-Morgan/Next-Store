"use client";
import { Card } from "@/components/ui/card";
import ThirdColumn from "./ThirdColumn";
import { CartItemWithProduct } from "@/lib/utils/types";
import { FirstColumn, FourthColumn, SecondColumn } from "./CartItemsColumns";

const CartItemsList = ({ cartItems }: { cartItems: CartItemWithProduct[] }) => {
  return (
    <div>
      {cartItems.map((item) => {
        const { id, amount } = item;
        const { id: productId, image, name, company, price } = item.product;
        return (
          <Card
            key={id}
            className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
          >
            <FirstColumn image={image} name={name} />
            <SecondColumn company={company} name={name} productId={productId} />
            <ThirdColumn id={id} quantity={amount} />
            <FourthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
};

export default CartItemsList;
