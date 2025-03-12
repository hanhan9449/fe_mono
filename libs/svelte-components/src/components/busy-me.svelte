<script lang="ts">
    import { getCount, incCount } from '../lib/api';
    import { onMount } from 'svelte';
    import Button from '../lib/component/button.svelte';
    import ColorPlate from '../lib/component/color-plate.svelte';
    import GlobalSticker from '../lib/component/global-sticker.svelte';
    import { PageEventName, defaultPageEvent } from '../lib/util/pageEvent.js';
    import {generateNiceColorCssText} from "../lib/util/generateNiceColor";
    export let data: any;


    $: colorVariable = generateNiceColorCssText()
    $: count = data?.homeCount || 0;
    $: title = '我有拖延症!';
    // ssr的数据有些时候不是最新的，待排查。
    // 数据补偿
    onMount(async () => {
        count = await getCount('home')
    })
    /** @type {import('./$types').PageData} */

    async function handleIncCount() {
        defaultPageEvent.emit(PageEventName.NOTICE_SHOW, {
            title: '立马+1',
            desc: '友好的表示赞同'
        })
        const next = await incCount('home');
        count = next;
    }
</script>


{@html colorVariable}
<main class="main">
    <span class="t1">{title}</span>
    <div class="count-panel">
        <span class="count-text">亻：{count}</span>
        <Button type="circle" on:click={handleIncCount}>
            <span class="count-text">+1</span>
        </Button>
    </div>
    <GlobalSticker />
    <!-- <ColorPlate /> -->

</main>

<style>
    .main {
        width: 100vw;
        height: 100vh;
        background: var(--bg-color1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .count-panel {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    @font-face {
        font-family: 'DouyinSansBold';
        src: url('https://r2-oss.hanhan9449.top/DouyinSansBold.ttf');
        font-display: block;
    }

    .count-text {
        color: var(--text-color2);
    }
    .t1 {
        font-size: 10vw;
        font-family: 'DouyinSansBold';
        letter-spacing: 1vw;
        color: var(--text-color1);
    }
    :global(html, body) {
        margin: 0;
        padding: 0;
        touch-action: pan-x pan-y;
    }
</style>
