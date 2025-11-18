
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
		<h1 class="title">Remy's Speed Test</h1>
		<div class="dotted"></div>
		<h2 class="subtitle">Choose the times tables you want to practice</h2>
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
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%235b5b5b' fill-opacity='0.63'%3E%3Cpath opacity='0' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		min-height: 100vh;
		max-width: 100vw;
		padding: 0;
		margin: 0;
	}
	.title {
		font-size: 2rem;
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

	.content{
		display: flex;
		flex-direction: column;
		/* border: solid 2px red; */
		justify-content: start;
		align-items: center;
		max-width: 100vw;
		min-height: 50vh;
	}
	.tables-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 2rem;
		/* border: solid 2px green; */
		width: 100%;
	}
	.table-btn {
		background: #fff;
		border-radius: 8px;
		font-size: 2.5rem;
		font-weight: 700;
		color: #4a7ac7;
		width: 60%;
		height: 100%;
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

	/* 640px: small tablet */
	/* @media (min-width: 640px) {
		.tables-grid {
			grid-template-columns: repeat(3, 1fr);
			border: red;
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

	/* 768px: tablet portrait */
	/* @media (min-width: 768px) {
		.tables-grid {
			grid-template-columns: repeat(3, 1fr);
			border: red;
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
	} */

	/* 1024px: tablet landscape / small laptop */
	/* @media (min-width: 1024px) {
		.tables-grid {
			grid-template-columns: repeat(4, 1fr);
		}
		.table-btn {
			width: 140px;
			height: 110px;
			font-size: 2rem;
		}
		.actions {
			flex-direction: row;
			align-items: center;
			gap: 1rem;
		}
	} */

	/* @media (min-width: 1200px) and (max-height: 700px) {
   
	} */


	/* 1280px: laptop */
	/* @media (min-width: 1280px) {} */

	/* 1536px: large desktop */
	/* @media (min-width: 1536px) {} */
	



</style>

