<header>
	<h1>Annuaire</h1>
	<div class="search-container">
		<label for="recherche">Rechercher</label>
		<input type="text" name="recherche" id="recherche" placeholder="Sylvain" />
		<img src="/icons/search.svg" alt="search icon" />
	</div>
</header>

<style lang="scss">
	@use '$lib/style/main.scss';

	header {
		@include main.flex($justify: space-between);

		height: 75px;
		padding: 0 main.$margin-s;

		background: main.$dark;

		h1 {
			@include main.setFont(large);

			color: main.$light;
		}
		.search-container {
			@include main.flex($direction: column, $align: start);
			position: relative;

            width: 35%;

			label {
				@include main.setFont(x-small);

				color: main.$light;
			}
			input {
				@include main.setFont(x-small);

                width: 100%;
				padding: main.$margin-xs main.$margin-s;
				border-radius: 5px;

                outline: none;
				border: none;
			}
			img {
				position: absolute;

				right: main.$margin-s;
				bottom: main.$margin-xs;
			}
		}
	}
</style>
