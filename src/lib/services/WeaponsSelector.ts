import { writable } from 'svelte/store';

import type { SelectorOption } from '$lib/types/form';

export class WeaponsSelector {
	selector;
	constructor() {
		this.selector = writable({
			loading: true,
			options: [] as SelectorOption[]
		});
		this.fetchOptions();
	}

	fetchOptions = async () => {
		try {
			this.selector.update((prev) => ({ ...prev, loading: true }));
			const response = await this.getWeapons();
			this.selector.update((prev) => ({
				...prev,
				loading: false,
				options: response.map((option) => ({ label: option.name, value: option.id }))
			}));
		} catch (error) {
			console.log(error);
		} finally {
			this.selector.update((prev) => ({ ...prev, loading: false }));
		}
	};

	private getWeapons = async () => {
		const response = await new Promise<{
			ok: boolean;
			statusText: string;
			json: () => Promise<{ id: string; name: string }[]>;
		}>((res) => {
			const response = {
				ok: true,
				statusText: 'Success',
				json: async () =>
					Promise.resolve([
						{ id: '1', name: 'Sword' },
						{ id: '2', name: 'Dagger' },
						{ id: '3', name: 'Bow' },
						{ id: '4', name: 'Halberd' },
						{ id: '5', name: 'Staff' }
					])
			};
			setTimeout(() => res(response), 3000);
		});
		if (!response.ok) throw new Error(response.statusText);
		return response.json();
	};
}
