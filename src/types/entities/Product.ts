export default interface Product {
  id: string;
  user_id: string; // satisfy User.id
  category_id: string; // satisfy Category.id
  title: string;
  description: string;
  price: number;
  created_at: string;
}
