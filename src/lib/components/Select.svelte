<script lang="ts">
	let { options = $bindable(), label = $bindable() } = $props();
	let selectedOptions: any[] = $state([]);

	/**
	 * Add the options to the selected ones or remove it if it was already selected
	 *
	 * @param {number} val The value to add
	 */
	const addOption = (val: number) => {
		if (selectedOptions.includes(val)) {
			selectedOptions = selectedOptions.filter((option) => option !== val);
		} else {
			selectedOptions.push(val);
		}

		console.log(selectedOptions);
	};
</script>

<div class="select">
	<div class="selected-options">
		{#each selectedOptions as selectedOption}
			<span>{selectedOption[label]}</span>
		{/each}
	</div>
	<div class="input-container">
		<input type="text" />
		<div class="available-options">
			{#each options as option, index}
				<input
					type="checkbox"
					name="option"
					id={'option-' + index}
					onchange={() => addOption(option)}
				/>
				<label for={'option-' + index}>{option[label]}</label>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	@use '$lib/style/main';

	.select {
		position: relative;
		width: 300px;

		.input-container {
			@include main.flex($direction: column);

			input {
				&:focus,
				&:focus-visible,
				&:focus-within,
				&:active {
					~ .available-options {
						display: unset;
					}
				}
			}
			.available-options {
				@include main.flex($direction: column, $wrap: nowrap, $gap: main.$margin-xs);
				position: absolute;
				overflow-x: hide;
				overflow-y: scroll;
				display: none;

				height: 200px;
				width: 100%;

				top: 100%;
				
				&:hover {
					display: unset;
				}
			}
		}
	}
</style>
