<script>
  import AddPlayerForm from '../components/AddPlayerForm.svelte';
  import PlayerList from '../components/PlayerList.svelte';
  import MatchDetails from '../components/MatchDetails.svelte';
  import { currentView } from '../lib/stores/navigation';

  const title = 'Sparta Futsal Roster';
</script>

<div class="min-h-screen bg-indigo-50">
  <header class="sticky top-0 z-10 bg-white p-4 shadow-md">
    <h1 class="text-3xl font-extrabold text-indigo-700">{title}</h1>
  </header>

  <main class="p-6 lg:p-10">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div class="space-y-8 lg:col-span-2">
        <AddPlayerForm />
        <PlayerList />
      </div>

      <div class="lg:col-span-1">
        <div class="lg:sticky lg:top-24">
          <MatchDetails />
        </div>
      </div>
    </div>

    <div class="py-6">
      <button
        on:click={() => currentView.set('export')}
        class="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
      >
        Export Roster
      </button>
    </div>
  </main>
</div>
