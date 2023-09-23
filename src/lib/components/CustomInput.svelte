<script lang="ts">
	export let onChange = (
		e: Event & {
			currentTarget: (EventTarget & HTMLInputElement) | HTMLSelectElement;
		}
	) => {
		console.log(e.currentTarget);
	};
	export let name = 'name';
	export let value = '';
	export let label = 'label';
	export let type = 'text';
	export let options = [
		{ label: 'Option 1', value: '1' },
		{ label: 'Option 2', value: '2' }
	];
	export let loadingOptions = false;
</script>

<div class="container">
	<label for={name} class="label">{label}</label>
	{#if type === 'select'}
		{#if loadingOptions}
			<p class="input loading">Loading Options...</p>
		{:else}
			<select id={name} {name} {value} class="input" on:change={onChange}>
				<option class="option" value="" />
				{#each options as { label, value }}
					<option {value} class="option">{label}</option>
				{/each}
			</select>
		{/if}
	{:else}
		<input id={name} {name} {value} {type} on:input={onChange} class="input" />
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 200px;
	}

	.loading {
		font-size: 12px;
		line-height: 26px;
		color: #999
	}
</style>
