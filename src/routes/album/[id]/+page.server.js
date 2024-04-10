export async function load({ params, fetch }) {
  try {
    const response = await fetch(`/api/chart/album/${params.id}`);
    const album = await response.json();
    return { album };
  } catch (error) {
    return { error };
  }
}
