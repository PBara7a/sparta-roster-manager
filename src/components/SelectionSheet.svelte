<script>
  import { matchDetails, selectedKit } from '../lib/stores/matchDetails';
  import { playerStore } from '../lib/stores/players';
  import KitBadges from './KitBadges.svelte';
  import logoUrl from '../assets/sparta-logo.png?url';
  import squadHome from '../assets/home-kit.jpg?url';
  import squadAway from '../assets/away-kit.jpg?url';

  $: matchData = $matchDetails;
  $: availablePlayers = $playerStore.filter((player) => player.isAvailable);

  export let width = 1754;
  export let height = 1240;

  const ourTeam = 'Sparta Belfast FC';
  const squadImageUrl = $selectedKit === 'HOME' ? squadHome : squadAway;
</script>

<!-- Fixed-size A4 landscape canvas -->
<div
  class="relative box-border bg-white p-10 text-black [color-scheme:light]"
  style="width:{width}px; height:{height}px;"
>
  <header class="mb-12 text-center">
    <div class="text-xs tracking-[0.2em] uppercase opacity-70">Match</div>
    <h1 class="mt-1 text-[44px] leading-tight font-extrabold">
      {matchData.homeOrAway === 'HOME'
        ? `${ourTeam} (H) vs ${matchData.opponent} (A)`
        : `${matchData.opponent} (H) vs ${ourTeam} (A)`}
    </h1>
  </header>

  <main class="mt-6 space-y-12">
    <!-- Match Details -->
    <section class="flex justify-center gap-12">
      <div class="grid max-w-6xl grid-cols-[120px_1fr] items-center gap-x-4 gap-y-2">
        <div class="font-bold uppercase">Venue</div>
        <!-- Adding inline styles because html2canvas can't handle classes like bg-gray-100 -->
        <div class="min-h-8 rounded-md px-3 py-1.5" style="background-color: #f3f4f6">
          {matchData.venue}
        </div>

        <div class="font-bold uppercase">Date</div>
        <div class="min-h-8 rounded-md px-3 py-1.5" style="background-color: #f3f4f6">
          {matchData.date}
        </div>

        <div class="font-bold uppercase">Time</div>
        <div class="min-h-8 rounded-md px-3 py-1.5" style="background-color: #f3f4f6">
          {matchData.kickoffTime}
        </div>

        <div class="font-black uppercase">Meet At:</div>
        <div
          class="min-h-8 rounded-md px-3 py-1.5 text-lg font-black"
          style="background-color: #fee2e2"
        >
          {matchData.meetingTime}
        </div>

        <div class="font-bold uppercase">Kit</div>
        <KitBadges />
      </div>

      <!-- Logo at the far right -->
      <div class="flex items-center justify-center">
        <img src={logoUrl} alt="Club logo" class="object-contain" />
      </div>
    </section>

    <hr style="border: none; border-bottom: 4px solid #f3f4f6;" />

    <!-- Player Section -->
    <section class="flex justify-center gap-12">
      <div>
        <h2 class="mb-3 text-3xl font-extrabold">
          <span class="px-1">Players</span>
        </h2>
        <ul class="list-inside space-y-1 text-xl">
          {#each availablePlayers as player}
            <li>{`#${player.number} ${player.name}`}</li>
          {/each}
        </ul>
      </div>

      <!-- Squad Photo -->
      <div class="flex h-[420px] w-[760px] overflow-hidden rounded-lg">
        <img src={squadImageUrl} alt="Team" class="h-full w-full object-cover" />
      </div>
    </section>
  </main>
</div>
