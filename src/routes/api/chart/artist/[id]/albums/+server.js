import { json } from "@sveltejs/kit";

export async function GET({ url, params }) {
  const searchParams  = url.searchParams; 
  const response = await fetch(
    `https://api.deezer.com/artist/${params.id}/albums?limit=${100000000}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  return json(result);
}


