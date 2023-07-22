<script>
    import { Deck } from "@deck.gl/core";
    import mapbox from "mapbox-gl";
    import { onMount } from "svelte";

    let map = null;
    export let deck = null;
    let deckMap = null;
    let deckCanvas = null;
    let options = {};

    export let layers = [];
    export let viewState = {};
    export let TOKEN = null;
    export let getTooltip = () => {};
    $: console.log(layers);
    onMount(() => {
        // creating the map
        mapbox.accessToken = TOKEN;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "https://unpkg.com/mapbox-gl/dist/mapbox-gl.css";

        const optionsWithDefaults = Object.assign(
            {
                container: deckMap,
                style: viewState.style,
                center: [viewState.longitude, viewState.latitude],
                zoom: viewState.zoom,
                interactive: false,
                bearing: viewState.bearing,
                pitch: viewState.pitch,
            },
            options
        );

        document.head.appendChild(link);

        link.onload = () => {
            map = new mapbox.Map(optionsWithDefaults);
            render();
            deck.setProps({ layers: [layers] });
        };
        return () => {
            map.remove();
            link.parentNode.removeChild(link);
        };
    });
    // creating the deck.gl instance
    function render() {
        deck = new Deck({
            canvas: deckCanvas,
            width: "100%",
            height: "100%",
            initialViewState: viewState,
            controller: true,
            layers: [],
            onViewStateChange: ({ viewState }) => {
                map.jumpTo({
                    center: [viewState.longitude, viewState.latitude],
                    zoom: viewState.zoom,
                    bearing: viewState.bearing,
                    pitch: viewState.pitch,
                });
            },
            getTooltip,
        });
    }
</script>

<div class="deck-container">
    <div class="map-container" bind:this={deckMap} />
    <canvas class="deck-canvas" bind:this={deckCanvas} />
</div>

<style>
    .deck-container {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .map-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #e5e9ec;
        overflow: hidden;
    }

    .deck-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
