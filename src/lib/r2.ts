export async function uploadToR2(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const uploadUrl = import.meta.env.DEV ? "http://localhost:3001/api/upload" : "/api/upload";
  const res = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Upload failed");
  }

  const { url } = await res.json();
  return url;
}
