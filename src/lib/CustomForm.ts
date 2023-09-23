export class CustomForm {
	defaultValues: Record<string, string>;
	emptiedForm: Record<string, ''>;
	state: Record<string, string>;
	constructor({ defaultValues = {} }: { defaultValues?: Record<string, string> }) {
		this.defaultValues = defaultValues;
		this.emptiedForm = Object.fromEntries(Object.keys(this.defaultValues).map((e) => [e, '']));
		this.state = defaultValues;
	}

	handleSubmit = () => {
		console.log(this.state);
	};

	clear = () => {
		this.state = { ...this.emptiedForm };
	};

	handleChange = (
		e: Event & {
			currentTarget: (EventTarget & HTMLInputElement) | HTMLSelectElement;
		},
		value?: string
	) => {
		this.state[e.currentTarget.name] = value || e.currentTarget.value;
	};
}
