export async function load({ fetch }) {
  // Fetch all music genres and top music charts from the server in parallel
  const [genresResponse, chartsResponse] = await Promise.all([
    fetch("/api/genre"),
    fetch("/api/chart")
  ]);

  const genres = await genresResponse.json();
  const charts = await chartsResponse.json();
  const { albums, artists, playlists } = charts;

  return {
    genres,
    albums,
    artists,
    playlists
  };
}