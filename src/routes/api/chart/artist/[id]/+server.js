import { json } from "@sveltejs/kit";

export async function GET({ params }) {
  const response = await fetch(
    `https://api.deezer.com/artist/${params.id}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  return json(result);
}