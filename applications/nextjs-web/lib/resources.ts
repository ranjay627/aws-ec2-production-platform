export type ResourceField = {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  step?: string;
};

export type ResourceConfig = {
  endpoint: string;
  singular: string;
  plural: string;
  description: string;
  fields: ResourceField[];
};

export type ResourceRecord = {
  id: string;
  [key: string]: string | number;
};

export const resourceConfigs = {
  products: {
    endpoint: "products",
    singular: "product",
    plural: "Products",
    description: "Maintain product details, pricing, and available stock.",
    fields: [
      { name: "name", label: "Product name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "price", label: "Price", type: "number", required: true, step: "0.01" },
      { name: "quantity", label: "Quantity in stock", type: "number", required: true, step: "1" },
    ],
  },
  categories: {
    endpoint: "categories",
    singular: "category",
    plural: "Categories",
    description: "Group related products into clear, easy-to-find collections.",
    fields: [
      { name: "name", label: "Category name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  customers: {
    endpoint: "customers",
    singular: "customer",
    plural: "Customers",
    description: "Keep customer contact information accurate and up to date.",
    fields: [
      { name: "firstName", label: "First name", type: "text", required: true },
      { name: "lastName", label: "Last name", type: "text", required: true },
      { name: "email", label: "Email address", type: "email", required: true },
      { name: "phone", label: "Phone number", type: "text" },
    ],
  },
  orders: {
    endpoint: "orders",
    singular: "order",
    plural: "Orders",
    description: "Review purchases and update their fulfillment status.",
    fields: [
      { name: "customerName", label: "Customer", type: "text", required: true },
      { name: "productName", label: "Product", type: "text", required: true },
      { name: "quantity", label: "Quantity", type: "number", required: true, step: "1" },
      { name: "total", label: "Order total", type: "number", required: true, step: "0.01" },
      { name: "status", label: "Status", type: "select", required: true, options: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"] },
    ],
  },
} satisfies Record<string, ResourceConfig>;