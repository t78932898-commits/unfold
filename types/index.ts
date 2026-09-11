export type UserRole = "CUSTOMER" | "ADMIN";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  active: boolean;
  productCount?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  sku: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  fit: string | null;
  material: string | null;
  collection: string | null;
  active: boolean;
  categoryId: string;
  category?: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
  badge?: "NEW" | "BEST SELLER" | "OVERSIZED" | "LIMITED";
}

export interface CartItemProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
}

export interface CartItem {
  id: string;
  variantId: string;
  size: string;
  color: string;
  quantity: number;
  product: CartItemProduct;
}

export interface FilterState {
  category?: string;
  size?: string;
  color?: string;
  fit?: string;
  sort?: "newest" | "price-asc" | "price-desc" | "popular";
  search?: string;
}
