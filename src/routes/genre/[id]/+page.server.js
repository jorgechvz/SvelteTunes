export async function load({ params, fetch }) {
  try {
    const response = await fetch(`/api/genre/${params.id}`);
    const genre = await response.json();
    return { genre };
  }
  catch (error) {
    return { error };
  }
}
