<script lang="ts">
	// import type { NoticeShowInput } from '$lib/type';
	import { generateRandomString } from '../util/generateRandomString';
	import { PageEventName, defaultPageEvent } from '../util/pageEvent';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	$: list = [];
	$: renderList = [];

	onMount(() => {
		defaultPageEvent.subscribe(PageEventName.NOTICE_SHOW, (a) => {
			a._id = generateRandomString();
			list = [...list, a];
			setTimeout(() => {
				list = list.filter((it) => it._id !== a._id);
			}, a.duration || 3000);
		});
	});
	$: {
		let prev = null;
		let nextRenderList = [];
		for (const a of list) {
			if (prev && a.title === prev.title && a.desc === prev.desc) {
				prev._count++;
			} else {
				prev = { ...a };
				prev._count = 1;
				nextRenderList.push(prev);
			}
		}
		renderList = nextRenderList;
	}
</script>

<div class="notice-panel">
	{#each renderList as a}
		<div
			in:fly={{ delay: 0, duration: 300, x: 200, opacity: 0.5 }}
			out:fade={{ delay: 0, duration: 300 }}
			class="notice-item"
		>
			<div class="title">
				{a.title}
			</div>
			{#if a.desc}
				<div class="desc">
					{a.desc}
				</div>
			{/if}

			{#if a._count > 1}
				<div class="count">
					x{a._count}
				</div>
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	.notice-panel {
		position: fixed;
		top: 20px;
		right: 20px;
	}

	.notice-item {
		width: 200px;
		padding: 10px 12px;
		border-radius: 8px;
		border: 1px solid var(--normal-color1);
		background-color: var(--normal-color2);
		box-shadow: 3px 5px 20px 0px var(--normal-color1);
	}

	.title {
		font-weight: 600;
		font-size: 14;
		color: var(--text-color2);
	}
	.desc {
		color: var(--text-color2);
		opacity: 0.8;
	}
	.count {
		font-weight: 400;
		font-size: 12px;
		color: var(--text-color2);
		opacity: 0.6;
	}
</style>
