<script>
	let colorList = [
        '--normal-color1',
        '--normal-color2',
        '--normal-color3',
        '--normal-color4',
        '--normal-color5',
    '--text-color1',
    '--text-color2',
    '--bg-color1',
    ].map(it => `var(${it})`);
</script>

<div style="display: flex">
	{#each colorList as color}
		<div style="background: {color.toString()}" class="box" />
	{/each}
</div>

<style>
	.box {
		width: 40px;
		height: 40px;
	}
</style>
