<script>
    import { onMount } from "svelte";
    import { Deck } from "@deck.gl/core";
    import { GeoJsonLayer } from "@deck.gl/layers";

    let viewState = {
        latitude: 51.47,
        longitude: 0.45,
        zoom: 4,
        bearing: 0,
        pitch: 30,
    };

    let deck = null;
    let deckCanvas = null;

    onMount(() => {
        render();
    });

    function render() {
        const INITIAL_VIEW_STATE = {
            latitude: 51.47,
            longitude: 0.45,
            zoom: 4,
            bearing: 0,
            pitch: 30,
            ...viewState,
        };

        deck = new Deck({
            canvas: deckCanvas,
            width: "100%",
            height: "100%",
            initialViewState: INITIAL_VIEW_STATE,
            controller: true,
            layers: [
                new GeoJsonLayer({
                    id: "base-map",
                    data: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson",
                    // Styles
					stroked: true,
					filled: true,
					lineWidthMinPixels: 2,
					opacity: 0.4,
					getLineColor: [60, 60, 60],
					getFillColor: [200, 200, 200]
                }),
            ],
        });
    }
</script>

<div class="App">
    <canvas class="deck-canvas" bind:this={deckCanvas} />
</div>

<style>
    .App {
        height: 100vh;
        width: 100vw;
    }
    .deck-canvas {
        width: 100%;
        height: 100%;
    }
</style>
