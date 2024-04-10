import { json } from "@sveltejs/kit";

export async function GET({ params }) {
  const urls = [
    `https://api.deezer.com/artist/${params.id}`,
    `https://api.deezer.com/artist/${params.id}/top`,
    `https://api.deezer.com/artist/${params.id}/albums`,
    `https://api.deezer.com/artist/${params.id}/related`,
    `https://api.deezer.com/artist/${params.id}/playlists`,
  ];
  const responses = await Promise.all(urls.map((url) => fetch(url)));
  
  responses.forEach((response, i) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for URL: ${urls[i]}`);
    }
  });

  const [artist, top, albums, related, playlists] = await Promise.all(
    responses.map((response) => response.json())
  );
  return json({ artist, top, albums, related, playlists });
}