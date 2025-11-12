"use client";

import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";
import { toggleFavAction } from "@/lib/utils/actions";
import { CardSubmitButton } from "../form/Buttons";

type FavoriteToggleFormProps = {
  productId: string;
  favoriteId: string | null;
};

const FavoriteToggleForm = ({
  productId,
  favoriteId,
}: FavoriteToggleFormProps) => {
  const pathName = usePathname();
  // we wanna use bind to pass productId, favoriteId, and pathName into toggleFavoriteAction
  const toggleAction = toggleFavAction.bind(null, {
    productId,
    favoriteId,
    pathName,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
};

export default FavoriteToggleForm;
