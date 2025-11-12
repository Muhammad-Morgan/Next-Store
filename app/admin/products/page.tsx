import EmptyList from "@/components/global/EmtpyList";
import { fetchAdminProducts } from "@/lib/utils/actions";
import Link from "next/link";

import { formatCurrency } from "@/lib/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";
import { deleteProductAction } from "@/lib/utils/actions";
import { toast } from "@/components/ui/use-toast";

const AdminProductsPage = async () => {
  const adminProducts = await fetchAdminProducts();
  if (adminProducts.length === 0) return <EmptyList />;
  return (
    <section>
      <Table>
        <TableCaption className="capitalize">
          total products : {adminProducts.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminProducts.map((product) => {
            const { id: productId, price, company, name } = product;
            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link
                    href={`/products/${productId}`}
                    className="underline text-muted-foreground tracking-wide capitalize"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)} </TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/admin/products/${productId}/edit`}>
                    <IconButton actionType="edit" />
                  </Link>
                  <DeleteProduct productId={productId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
};
async function DeleteProduct({ productId }: { productId: string }) {
  // we use bind in order to pass the productId to the delete method in actions.ts
  const deleteProduct = deleteProductAction.bind(null, { productId });
  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default AdminProductsPage;
