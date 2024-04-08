export async function load({ params, fetch }) {
    try {
        const response = await fetch(`/api/chart/playlist/${params.id}`);
        const playlist = await response.json();
        return { playlist };
    } catch (error) {
        return { error };
    }
}
