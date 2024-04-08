import { json } from "@sveltejs/kit";

const url = "https://api.deezer.com/genre";

export async function GET() {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  const { data } = result;
  return json(data);
}
