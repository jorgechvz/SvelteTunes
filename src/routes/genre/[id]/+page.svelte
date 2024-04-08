<script>
    export let data
    $: ({ genre } = data)
</script>

<section>
    <h1>Genre Id: {genre.id}</h1>
    <h2>Genre Name: {genre.name}</h2>
</section>