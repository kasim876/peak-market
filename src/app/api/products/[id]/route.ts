import z from "zod";
import db from "../..";

const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce.number().gt(0),
  categoryId: z.string(),
});

async function getProduct(id: string) {
  const { data, error } = await db
    .from("products")
    .select(
      `title, description, price,
        categories!inner(name),
        users!inner(name, surname, avatar_url)`,
    )
    .eq("id", id);
  if (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch products");
  }

  return data;
}

async function updateProduct(id: string, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    categoryId: formData.get("categoryId"),
  });

  if (!validatedFields.success) {
    throw new Error("Invalid data.");
  }

  const { title, description, price, categoryId } = validatedFields.data;

  const { data, error } = await db
    .from("products")
    .update({
      title,
      description,
      price,
      category_id: categoryId,
    })
    .eq("id", id).select(`
		title, description, price,
		categories!inner(name),
		users!inner(name, surname, avatar_url)
	`);

  if (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create product");
  }

  return data;
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    return Response.json(await getProduct((await params).id));
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const formData = await request.formData();

    return Response.json(await updateProduct((await params).id, formData));
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
