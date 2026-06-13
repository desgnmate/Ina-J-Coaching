import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, type, slug } = body;

    if (secret !== process.env.SANITY_REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    if (type === "post") {
      revalidateTag("posts", { expire: 60 });
      if (slug) {
        revalidatePath(`/blog/${slug}`);
      }
      revalidatePath("/blog");
    }

    if (type === "category") {
      revalidateTag("categories", { expire: 60 });
      if (slug) {
        revalidatePath(`/blog/category/${slug}`);
      }
    }

    return NextResponse.json({ revalidated: true, type, slug });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
