<script>
    import { default as SvelteDeckGL } from './components/Deckgl.svelte';
    
    const MAPBOX_TOKEN = "pk.eyJ1IjoiYXJwZXJ5YW4iLCJhIjoiY2l4cTJkc2t6MDAzcjJxcG9maWp1ZmFjMCJ9.XT957ywrTABjNFqGdp_37g";

    let deckInstance;


    function getTooltip({ object }) {
        if (!object) {
            return null;
        }

        const count = object.points.length;

        return object && `No. of bikes: ${count} `;
    }
    let viewState = {
        longitude: -122.4,
        latitude: 37.8,
        zoom: 11.2,
        maxZoom: 20,
        pitch: 50,
        bearing: -60,
        style: "mapbox://styles/arperyan/cj8n10t397cyn2rkap4ybrjid",
    };


</script>

<div class="App">
    <SvelteDeckGL {viewState} {getTooltip} TOKEN={MAPBOX_TOKEN} bind:deck={deckInstance} />
</div>

<style>
    .App {
        height: 100vh;
        width: 100vw;
    }
</style>
