import { json } from "@sveltejs/kit";

export async function GET(event) {
  const { searchParams } = event.url;
  const search = searchParams.get("q");
  const index = searchParams.get("index") || 0; // Get the index parameter, default to 0 if not provided
  const response = await fetch(`https://api.deezer.com/search/artist?q=${search}&index=${index}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  return json(result);
}
