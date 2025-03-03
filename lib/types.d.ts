type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

/* type ContactType = {
  _id: string;
  nombre: string;
  numero: string;
  categoria: array;
  description: string;
};
 */
type ContactType = {
  _id: string;
  nombre: string;
  numero: string;
  categoria: "Cliente" | "Proveedor" | "Otros"; // Ajusta el tipo para que coincida con formSchema
  description: string;
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
};

type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  totalAmount: number;
  createdAt: string;
};

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
};

type CustomerType = {
  clerkId: string;
  name: string;
  email: string;
};

type RolloType = {
  _id: string;
  tissue: string;
  color: string;
  meters: string;
  peso: string;
  precio: string;
  image: string;
};
