import Category from "./Category";
import User from "./User";

export default interface Product {
  id: string;
  users: User;
  categories: Category;
  image_url: string;
  title: string;
  description: string;
  price: number;
  created_at: string;
}
