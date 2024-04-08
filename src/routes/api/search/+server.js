import { json } from "@sveltejs/kit";

export async function GET(event) {
  const { searchParams } = event.url;
  const search = searchParams.get("q");
  const response = await fetch(`https://api.deezer.com/search?q=${search}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  return json(result);
}
