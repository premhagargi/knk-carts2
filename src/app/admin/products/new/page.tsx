import { AdminPageHeader } from '@/components/admin/admin-ui';
import ProductForm from '../product-form';

export default function NewProductPage() {
  return (
    <div>
      <AdminPageHeader title="New product" description="Add a chassis or model to the catalog" />
      <ProductForm />
    </div>
  );
}
