export async function load({ fetch, url }) {
    try {
        const searchparams = url.searchParams;
        const q = searchparams.get("q");
        const response = await fetch(`/api/search?q=${q}`);
        const results = await response.json();
        return { results };
    } catch (error) {
        return { status: 500, error: error.message };
    }
}