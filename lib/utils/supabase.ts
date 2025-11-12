import { createClient } from "@supabase/supabase-js";

// add the bucket name to create instance.
const bucket = "main-bucket";
// Create a single supabase client for interacting with your database
// provide 2 env vars and be aware, they can be undefined.
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);
// Set the upload Image function
export const uploadImage = async (image: File) => {
  const timeStamp = Date.now();
  // Using time stamp and image name to set the name of this image name
  const newName = `${timeStamp}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });
  if (!data) throw new Error("Image upload failed");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
// Helper function to delete pics from Supabase
export const deleteImage = (url: string) => {
  const imageName = url.split("/").pop();
  // since it's undefined we do check
  if (!imageName) throw new Error("invalid url");
  console.log(imageName);
  return supabase.storage.from(bucket).remove([imageName]);
};
