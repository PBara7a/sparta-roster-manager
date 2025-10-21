<script>
  import { addPlayer } from '../lib/stores/players';
  let name = '';
  let number = '';

  function submit(e) {
    e.preventDefault();
    if (!name || !number) return;
    addPlayer(name.trim(), number);
    name = '';
    number = '';
  }
</script>

<section class="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
  <h2 class="mb-4 text-xl font-bold text-gray-800">Insert New Player</h2>
  <form class="space-y-4" on:submit={submit}>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label for="player-name" class="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          id="player-name"
          class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          bind:value={name}
          required
        />
      </div>
      <div>
        <label for="player-number" class="block text-sm font-medium text-gray-700">Number</label>
        <input
          id="player-number"
          type="number"
          min="1"
          max="99"
          class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          bind:value={number}
          required
        />
      </div>
    </div>
    <button
      type="submit"
      class="w-full cursor-pointer rounded-lg bg-indigo-500 px-6 py-2 font-semibold text-white shadow-md shadow-indigo-300 transition duration-300 hover:bg-indigo-600 md:w-auto"
    >
      Add Player to Roster
    </button>
  </form>
</section>
