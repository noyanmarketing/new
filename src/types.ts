export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  companyName?: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  code: string;
  stock: number;
  price: number;
  status: string[];
}
