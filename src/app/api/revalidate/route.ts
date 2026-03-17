import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Note: Ensure you set SANITY_REVALIDATE_SECRET in your .env
const secret = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current: string };
    }>(req, secret);

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    // Revalidate specific post and blog listing
    if (body._type === "post" && body.slug?.current) {
      revalidatePath(`/blog/${body.slug.current}`, "page");
      revalidatePath("/blog", "page");
      revalidatePath("/sitemap.xml", "page"); 
      
      /* 
      revalidateTag("posts-paginated");
      revalidateTag("post-by-slug");
      revalidateTag("post-slugs");
      */
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: any) {
    console.error("Revalidation error:", err);
    return new NextResponse(err.message, { status: 500 });
  }
}
