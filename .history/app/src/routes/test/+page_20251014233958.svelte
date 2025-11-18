<script lang="ts">
	import { goto } from "$app/navigation";
	import { GameStore } from "../../stores/gameStore.svelte";
	import { onMount } from "svelte";

	let counter = $state(10);
	let currentIndex = $state(0);
	let userAnswer = $state("");
	let message = $state("");
    let isTestCompleted = $state(false)
    let testScore;

	let store = GameStore;
    
    function startTimer() {
        let timer = setInterval(() => {
            if (counter > 0) counter--;
            else clearInterval(timer);
        }, 1000);
    }

	onMount(() => {
		startTimer();
	});


	function submitAnswer() {
		const q = store.allQuestions[currentIndex];
		if (!q) return;

		if (parseInt(userAnswer) === q.answer) {
			message = "✅ Correct!";
			userAnswer = "";
            counter = 10;
			if (currentIndex < store.allQuestions.length - 1) {
				currentIndex++;
			} else {
				message = "Test complete!";
                isTestCompleted = true;
				counter = 0
			}
		} else {
			message = "Try again!";
		}
	}

	function startAgain(){
		currentIndex = 0
		store.clearSelectedTables()
		
		isTestCompleted = false
		store.generateQuestions(store.getTables())
		counter = 10
		startTimer()
	}

	function pickNewTimestable(){
		store.clearSelectedTables()
		store.removeQuestions()
		goto("/")
		
	}
</script>

<div class="landing-bg">
	<div class="test-container">
		<h1 class="title">Remy's Speed Test</h1>
		<div class="dotted"></div>

		{#if store.allQuestions.length > 0}
			<div class="question-section">
				<div class="timer">00:{counter}</div>
				
                {#if isTestCompleted == false && counter != 0}
				<h2 class="question">{store.allQuestions[currentIndex].question}</h2>
                    <div class="input-area">
                        <input
                            type="text"
                            bind:value={userAnswer}
                            on:keydown={(e) => e.key === "Enter" && submitAnswer()}
                            placeholder="Your answer"
                        />
                        <button class="green-btn" on:click={submitAnswer}>Submit</button>
                    </div>
                {:else}
                    <div class="input-area">
                        <button class="blue-btn" on:click={() => {
							store.clearSelectedTables()
							store.removeQuestions()
							goto("/")

							}}>pick new timestable</button>
                        <button class="green-btn" on:click={() => startAgain()}>Start Again</button>
                    </div>
                {/if}
				<p class="message">{message}</p>
			</div>
		{:else}
			<p class="no-questions">No questions loaded.</p>
			<button class="blue-btn" on:click={() => goto("/")}>Back to home</button>
		{/if}
	</div>
</div>

<style>
	.landing-bg {
		background: linear-gradient(180deg, #aabbdb, #e2e2e9);
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem;
	}

	.title {
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0;
		color: #222;
		text-align: center;
		font-family: Georgia, 'Times New Roman', Times, serif;
	}

	.dotted {
		border-bottom: 1px solid #222;
		margin: 1.2rem auto 2rem auto;
		width: 80%;
	}

	.test-container {
		background: white;
		border-radius: 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		padding: 3rem 4rem;
		max-width: 700px;
		width: 100%;
		text-align: center;
	}

	.timer {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 2rem;
		color: #2e5eaa;
	}

	.question-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.question {
		font-size: 2.5rem;
		font-weight: 600;
		color: #222;
		margin: 0;
	}

	.input-area {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}

	input {
		font-size: 2rem;
		padding: 0.8rem 1.5rem;
		width: 10em;
		border-radius: 10px;
		border: 2px solid #4a7ac7;
		text-align: center;
		color: #333;
		font-weight: 600;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
	}

	input:focus {
		outline: none;
		border-color: #2e5eaa;
		box-shadow: 0 0 0 3px rgba(74, 122, 199, 0.2);
	}

	.green-btn {
		background: linear-gradient(180deg, #b6e36b 0%, #8dbf2e 100%);
		color: #fff;
		font-size: 1.8rem;
		font-weight: 700;
		border: none;
		border-radius: 12px;
		padding: 0.8rem 2.5rem;
		box-shadow: 0 4px 0 #6b8e23;
		cursor: pointer;
		transition: background 0.2s;
	}
	.blue-btn {
		background: linear-gradient(180deg, #b6e36b 0%, #8dbf2e 100%);
		color: #fff;
		font-size: 1.8rem;
		font-weight: 700;
		border: none;
		border-radius: 12px;
		padding: 0.8rem 2.5rem;
		box-shadow: 0 4px 0 #6b8e23;
		cursor: pointer;
		transition: background 0.2s;
	}

	.green-btn:active {
		background: #8dbf2e;
	}

	.message {
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 1rem;
		color: #333;
	}

	.no-questions {
		font-size: 1.5rem;
		color: #555;
		text-align: center;
		margin-top: 2rem;
	}

	@media (max-width: 800px) {
		.test-container {
			padding: 2rem;
		}
		.title {
			font-size: 2.5rem;
		}
		.question {
			font-size: 1.8rem;
		}
		input {
			width: 130px;
			font-size: 1.4rem;
		}
		.green-btn {
			font-size: 1.5rem;
		}
	}
</style>
