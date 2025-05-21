interface Product {
  _id: string;
  title: string;
  description: string;
  retail_price: number;
  wholesale_price: number;
  extra_info: string;
  created_at: Date;
  category: string;
  sub_category: string;
  in_stock: boolean;
  image?: {
    secureUrl: string;
    publicId: string;
  };
}

type ProductWithoutId = Omit<Product, "_id">;
interface ProductInCart extends Product {
  quantity: number;
}
