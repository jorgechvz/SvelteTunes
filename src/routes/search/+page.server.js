/* export async function load({ fetch, url }) {
  try {
    const searchparams = url.searchParams;
    const q = searchparams.get("q");
    const response = await fetch(`/api/search/album?q=${q}`);
    const results = await response.json();
    return { results };
  } catch (error) {
    return { status: 500, error: error.message };
  }
}  */

export async function load({ fetch, url }) {
  try {
    const searchparams = url.searchParams;
    const q = searchparams.get("q");
    const index = searchparams.get("index") || 0; // Get the index parameter, default to 0 if not provided

    const urls = [
      `/api/search?q=${q}&index=${index}`,
      `/api/search/album?q=${q}&index=${index}`,
      `/api/search/artist?q=${q}&index=${index}`,
      `/api/search/playlist?q=${q}&index=${index}`,
    ];
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const [songs, albums, artists, playlists] = await Promise.all(
      responses.map((response) => response.json())
    );

    return { songs, albums, artists, playlists };
  } catch (error) {
    return { status: 500, error: error.message };
  }
}
