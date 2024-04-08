import { json } from "@sveltejs/kit";

const url = "https://api.deezer.com/chart";

export async function GET() {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  const { albums, artists, playlists } = result;
  return json({
    albums: albums.data,
    artists: artists.data,
    playlists: playlists.data,
  });
}