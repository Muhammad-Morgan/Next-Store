"use client";
import { useState } from "react";
import SelectProductAmount from "../single-product/SelectProductAmount";
import { Mode } from "../single-product/SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import {
  removeCartItemAction,
  updateCartItemAction,
} from "@/lib/utils/actions";
import { useToast } from "../ui/use-toast";

const ThirdColumn = ({ id, quantity }: { id: string; quantity: number }) => {
  const [amount, setAmount] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAmountChange = async (value: number) => {
    setIsLoading(true);
    toast({
      description: "Calculating...",
    });
    const result = await updateCartItemAction({
      amount: value,
      cartItemId: id,
    });
    setAmount(value);
    toast({
      description: result.message,
    });
    setIsLoading(false);
  };
  return (
    <div className="md:m;-8">
      <SelectProductAmount
        mode={Mode.CartItem}
        isLoading={isLoading}
        amount={amount}
        setAmount={handleAmountChange}
      />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" value={id} name="id" />
        <SubmitButton size="sm" className="mt-4" text="remove" />
      </FormContainer>
    </div>
  );
};

export default ThirdColumn;
