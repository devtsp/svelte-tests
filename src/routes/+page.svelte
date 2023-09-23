<script lang="ts">
	import { CustomForm } from '$lib/CustomForm';
	import CustomInput from '$lib/components/CustomInput.svelte';
	import Searching from '$lib/components/Searching.svelte';
	import { WeaponsSelector } from '$lib/services/WeaponsSelector';

	const form = new CustomForm({
		defaultValues: { name: 'Tarnished', exp: '120', weapon: 'Halberd' }
	});

	const weaponsSelector = new WeaponsSelector();
	const selector = weaponsSelector.selector;
</script>

<main>
	<h1>Svelte Form</h1>
	<form on:submit|preventDefault={form.handleSubmit} on:reset={form.clear}>
		<CustomInput name="name" label="Name" value={form.state.name} onChange={form.handleChange} />
		<CustomInput
			name="exp"
			type="number"
			label="Exp"
			value={form.state.exp}
			onChange={form.handleChange}
		/>
		<div class="flex">
			<CustomInput
				name="weapon"
				type="select"
				loadingOptions={$selector.loading}
				options={$selector.options}
				label="Weapon"
				value={form.state.weapon}
				onChange={form.handleChange}
			/>
			<button class="button" on:click={() => weaponsSelector.fetchOptions()} style="width:130px">
				{#if $selector.loading}
					<Searching />
          {:else}
					Reload Weapons
          {/if}
        </button>
      </div>
      
      <input type="reset" value="Clear" class="button" />
      <input type="submit" value="Send" class="button" />
    </form>
</main>

<style>
	form {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.flex {
		display: flex;
		gap: 10px;
		align-items: flex-end;
	}

	h1 {
		color: #ff3e00;
	}
</style>
