import { Cart } from "@prisma/client";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils/format";
import { createOrderAction } from "@/lib/utils/actions";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";

const CartTotals = ({ cart }: { cart: Cart }) => {
  const { shipping, tax, orderTotal, cartTotal } = cart;

  return (
    <div>
      <Card className="p-8">
        <CartTotalRow label="subtotal" amount={cartTotal} />
        <CartTotalRow label="shipping" amount={shipping} />
        <CartTotalRow label="tax" amount={tax} />
        <CartTotalRow label="order total" amount={orderTotal} lastRow={true} />
      </Card>
      <FormContainer action={createOrderAction}>
        <SubmitButton text="check out" className="w-full mt-8" />
      </FormContainer>
    </div>
  );
};

function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {lastRow ? null : <Separator className="my-2" />}
    </>
  );
}
export default CartTotals;
