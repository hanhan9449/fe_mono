<script>
	export let type;
</script>

<div class="base {type}" on:click><slot /></div>

<style>
	.base {
		border-radius: 8px;
		padding: 2px 5px;
		background: var(--normal-color3);
		border: 1px solid var(--normal-color2);
		cursor: pointer;
		user-select: none;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
        cursor: pointer;
	}
	.circle {
		border-radius: 50%;
		width: 48px;
		height: 48px;
	}
</style>
