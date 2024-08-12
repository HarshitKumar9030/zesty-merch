// @ts-nocheck 
import { Document, Schema } from "mongoose";

export interface EnrichedOrders {
  name: string;
  email: string;
  phone: string | null;
  address: AddressDocument;
  products: EnrichedProducts[];
  orderId: string;
  total_price: number;
  orderNumber: string;
  expectedDeliveryDate: Date;
  purchaseDate: string;
  _id: string;
}

export interface ContestDesign {
  design: Schema.Types.ObjectId; 
  user: Schema.Types.ObjectId; 
  name: string; 
  image: string; 
  description?: string;
  rating: number; 
  ratings: Rating[]; 
}

export interface EnrichedProducts {
  customDesign?: CustomDesignDocument; 
  productId: Schema.Types.ObjectId;
  size: string;
  variantId: string;
  quantity: number;
  price: number;
  color: string;
  category: string;
  image: string[];
  name: string;
  purchased: boolean;
  designId?: Schema.Types.ObjectId | null;
  _id:  Schema.Types.ObjectId;
}

export interface OrdersDocument extends Document {
  userId: string;
  orders: OrderDocument[];
}

export interface OrderDocument {
  name: string;
  email: string;
  phone: number;
  address: AddressDocument;
  products: ProductsDocument[];
  orderId: string;
  purchaseDate: Date;
  expectedDeliveryDate: Date;
  total_price: number;
  orderNumber: string;
  designId: [Schema.Types.ObjectId]
  _id: Schema.Types.ObjectId;
}

export interface AddressDocument {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}

export interface ProductsDocument {
  productId: Schema.Types.ObjectId;
  image: string;
  color: string;
  size: string;
  quantity: number;
  _id: string;
  designId?: Schema.Types.ObjectId[];
}

export interface FavoritesDocument extends Document {
  userId: string;
  favorites: Schema.Types.ObjectId[];
}

export interface ItemDocument {
  productId: Schema.Types.ObjectId;
  color: string;
  size: string;
  quantity: number;
  variantId: string;
  price: number;
  designId?: Schema.Types.ObjectId; 
}

export interface ProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  image: string[];
  variants: VariantsDocument[];
  quantity: number;
  productId: Schema.Types.ObjectId;
  purchased: boolean;
}

export interface CustomDesignDocument extends Document {
  [x: string]: string | number | Date;
  productId: Schema.Types.ObjectId;
  image: string;
  email: string;
  id: string;
  description?: string;
  name?: string;
}

export interface VariantsDocument {
  priceId: string;
  color: string;
  images: string[];
}

export interface UserDocument extends Document {
  email: string;
  password: string;
  instagram?: string;
  x?: string;
  github?: string;
  username?: string; 
  backgroundUrl?: string;
  description?: string;
  name: string;
  phone: string;
  address: AddressDocument;
  image: string;
  customDesigns: Schema.Types.ObjectId[];
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  details: string;
  purpose: 'contact' | 'technical' | 'orders' | 'designBattles' | 'others';
  orderId?: string; 
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsletterDocument extends Document {
  email: string;
  subscribedAt: Date;
}

export interface Rating {
  user: Schema.Types.ObjectId | UserDocument;
  rating: number;
}

export interface ContestDesignDocument extends Document {
  design: Schema.Types.ObjectId | CustomDesignDocument;
  user: Schema.Types.ObjectId | UserDocument;
  rating: number;
  ratings: Rating[];
}

export interface ContestDocument extends Document {
  imageUrl: string;
  name: string;
  description: string;
  startAt: Date;
  endAt: Date;
  image: string;
  enrolledUsers: (Schema.Types.ObjectId | UserDocument)[];
  designs: ContestDesignDocument[];
  createdAt: Date;
  updatedAt: Date;
}