export async function load({ params, fetch, url }) {
  try {
    const searchParams = url.searchParams;
    const index = searchParams.get("index") || 0; // Get the index parameter, default to 0 if not provided
    const urls = [
      `/api/chart/artist/${params.id}`,
      `/api/chart/artist/${params.id}/top?limit=10&index=${index}`,
      `/api/chart/artist/${params.id}/albums?index=${index}`,
      `/api/chart/artist/${params.id}/playlists?index=${index}&limit=20`,
    ];
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const [result, top, albums, playlists] = await Promise.all(
      responses.map((response) => response.json())
    );
    return { result, top, albums, playlists };
  } catch (error) {
    return { error };
  }
}
