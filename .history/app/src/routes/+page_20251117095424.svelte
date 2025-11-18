
<script lang="ts">
	import { goto } from "$app/navigation";
	import { GameStore } from "../stores/gameStore.svelte";

	let store = GameStore;
	let chosenTables = store.getTables()
	const tables = Array.from({ length: 12 }, (_, i) => i + 1);

	function selectTable(table: number) {
		store.addTables(table)
	}

	function allTables(){
		tables.forEach(table => {
			let index = chosenTables.indexOf(table)
			if(!chosenTables.includes(table)){
				selectTable(table)
				return
			}
			chosenTables.splice(index, 1)
		});
	}


	function start() {
		store.generateQuestions(chosenTables)
		goto("/test")
	}



	function lastResults() {
		alert('Show last results');
	}
</script>
<div class="landing-bg">
	<div style="padding: 1.5rem 2rem 0 2rem;">
		<div class="title">Remy's Speed Test</div>
		<div class="dotted"></div>
		<div class="subtitle">Choose the times tables you want to practice</div>
		<div class="content">
			<div class="tables-grid">
				{#each tables as table}
					<button
						type="button"
						class="table-btn {chosenTables.includes(table) ? 'selected' : ''}"
						on:click={() => {
	
							selectTable(table)
							}}
						aria-pressed={chosenTables[table] === table}
					>
						{table}
					</button>
				{/each}
			</div>
			<div class="actions">
				<div class="left-actions">
					{#if chosenTables.length == 12}
						<button class="blue-btn" on:click={allTables}>Deselect All Tables</button>
					{:else}
						<button class="blue-btn" on:click={allTables}>All tables</button>
					{/if}
				</div>
				<button class="green-btn" on:click={start}>Start</button>
			</div>
		</div>
	</div>
</div>

<style>
	.landing-bg {
		background: linear-gradient(180deg, #aabbdb, #e2e2e9);
		min-height: 100vh;
		padding: 0;
		margin: 0;
	}
	.title {
		font-size: 4rem;
		font-weight: 700;
		margin: 0 0 0.5rem 0;
		letter-spacing: 1px;
		color: #222;
		font-family: Georgia, 'Times New Roman', Times, serif;
		text-align: center;
	}
	.dotted {
		border-bottom: 1px solid #222;
		margin-bottom: 1.5rem;
	}
	.subtitle {
		font-size: 2.2rem;
		font-weight: 100;
		margin-bottom: 2.5rem;
		text-align: center;
		color: #222;
		font-family: Arial, Helvetica, sans-serif;
	}
	.tables-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto 2.5rem auto;
	}
	.table-btn {
		background: #fff;
		border: 2px solid #4a7ac7;
		border-radius: 8px;
		font-size: 2.5rem;
		font-weight: 700;
		color: #4a7ac7;
		width: 180px;
		height: 130px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: box-shadow 0.2s, border 0.2s;
		margin: 0 auto;
		box-shadow: 0 2px 8px rgba(0,0,0,0.04);
	}
	.table-btn.selected {
		border: 3px solid #2e5eaa;
		background: #eaf1ff;
		color: #2e5eaa;
	}
	.actions {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		max-width: 1200px;
		margin: 2rem auto 0 auto;
	}
	.left-actions {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}
	.blue-btn {
		background: linear-gradient(180deg, #5faaff 0%, #3576d1 100%);
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		border: none;
		border-radius: 12px;
		padding: 1rem 2.5rem;
		box-shadow: 0 4px 0 #2b5ca7;
		cursor: pointer;
		margin-bottom: 0.5rem;
		transition: background 0.2s;
	}
	.blue-btn:active {
		background: #3576d1;
	}
	.green-btn {
		background: linear-gradient(180deg, #b6e36b 0%, #8dbf2e 100%);
		color: #fff;
		font-size: 2rem;
		font-weight: 700;
		border: none;
		border-radius: 12px;
		padding: 1rem 3rem;
		box-shadow: 0 4px 0 #6b8e23;
		cursor: pointer;
		margin-left: 1rem;
		transition: background 0.2s;
	}
	.green-btn:active {
		background: #8dbf2e;
	}
	@media (max-width: 1100px) {
		.tables-grid {
			grid-template-columns: repeat(4, 1fr);
		}
		.actions {
			flex-direction: column;
			align-items: stretch;
			gap: 2rem;
		}
	}
	@media (max-width: 800px) {
		.tables-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.table-btn {
			width: 100px;
			height: 80px;
			font-size: 1.5rem;
		}
		.actions {
			flex-direction: column;
			align-items: stretch;
			gap: 2rem;
		}
	}

	@media (min-width: 1200px){
		.table-btn{
			height: 50px;
			width: 20px;
		}
	}
</style>

