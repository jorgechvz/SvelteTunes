export async function load({ params, fetch }) {
  try {
    const response = await fetch(`/api/chart/artist/${params.id}`);
    const artist = await response.json();
    return { artist };
  } catch (error) {
    return { error };
  }
}
