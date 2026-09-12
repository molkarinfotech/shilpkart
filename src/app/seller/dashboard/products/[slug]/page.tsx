import { SellerProductList } from './seller-product-list';
import { SellerProductForm } from './seller-product-form';
import { notFound } from 'next/navigation';

export default function SellerProductPage({
  params,
}: {
  params: { slug?: string };
}) {
  if (params.slug) {
    return <SellerProductForm slug={params.slug} />;
  }

  return <SellerProductList />;
}
