import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY, // optional for unsigned
  api_secret: process.env.CLOUDINARY_API_SECRET, // optional for unsigned
});

export async function POST(req: Request) {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_UPLOAD_PRESET) {
      return NextResponse.json(
        { error: "Cloudinary unsigned preset not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    if (!file.type.startsWith("image/")) return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    const maxBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxBytes) return NextResponse.json({ error: "Image must be less than 5MB" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "products", upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET },
          (err: UploadApiErrorResponse | undefined, res: UploadApiResponse | undefined) => {
            if (err) reject(err);
            else if (res) resolve(res);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    const raw = (error as any)?.message || String(error);
    return NextResponse.json({ error: raw }, { status: 500 });
  }
}
