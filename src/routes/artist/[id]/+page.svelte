<script>
    export let data
    $: ({ artist } = data)
</script>

<section>
    <h1>Artist Id: {artist.id}</h1>
    <h2>Artist Name: {artist.name}</h2>
</section>