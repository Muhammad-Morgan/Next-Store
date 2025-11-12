import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/lib/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { SubmitButton } from "@/components/form/Buttons";
import CheckBoxInput from "@/components/form/CheckBoxInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";

const AdminEditProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const currentProduct = await fetchAdminProductDetails(id);
  const { company, name, description, featured, price } = currentProduct;
  return (
    <section>
      <h1 className="text-2xl mb-8 font-semibold capitalize">update product</h1>
      <div className="border p-8 rounded">
        {/* IMAGE INPUT CONTAINER */}
        <ImageInputContainer
          action={updateProductImageAction}
          name={name}
          image={currentProduct.image}
          text="update image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={currentProduct.image} />
        </ImageInputContainer>
        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />
            <FormInput
              type="text"
              name="company"
              label="company"
              defaultValue={company}
            />
            <PriceInput defaultValue={price} />
          </div>
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckBoxInput
              name="featured"
              defaultChecked={featured}
              label="featured"
            />
          </div>
          <SubmitButton text="update product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
};

export default AdminEditProduct;
