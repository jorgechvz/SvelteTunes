import { json } from "@sveltejs/kit";

export async function GET({ url, params }) {
  const searchParams  = url.searchParams;
  const index = searchParams.get("index") || 0; // Get the index parameter, default to 0 if not provided
  const response = await fetch(
    `https://api.deezer.com/artist/${params.id}/playlists?index=${index}&limit=20`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  return json(result);
}



