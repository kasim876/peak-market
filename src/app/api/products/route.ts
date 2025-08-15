import z from "zod";
import db from "..";

const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce.number().gt(0),
  categoryId: z.string(),
  userId: z.string(),
});

async function listProducts() {
  const { data, error } = await db.from("products").select(`
		id, title, description, price, image_url,
		categories!inner(id, name),
		users!inner(id, name, surname, avatar_url)
	`);

  if (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch products");
  }

  return data;
}

async function createProduct(formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    categoryId: formData.get("categoryId"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    throw new Error("Invalid data.");
  }

  const { title, description, price, categoryId, userId } = validatedFields.data;

  const { data, error } = await db.from("products").insert([
    {
      title,
      description,
      price,
      category_id: categoryId,
      user_id: userId,
    },
  ]).select(`
		id, title, description, price, image_url,
		categories!inner(id, name),
		users!inner(id, name, surname, avatar_url)
	`);

  if (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create product");
  }

  return data;
}

export async function GET() {
  try {
    const products = await listProducts();
    return Response.json(products);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    return Response.json(await createProduct(formData));
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
