export default interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password_hash: string;
  avatar_url: string | null;
  created_at: string;
}
