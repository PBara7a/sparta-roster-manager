<script>
  import {
    selectedVenue,
    customVenue,
    selectedVenueType,
    matchDate,
    kickoffTime,
    selectedKit,
    meetingTime,
    selectedOpponent,
  } from '../lib/stores/matchDetails';
  import KitBadges from './KitBadges.svelte';

  const venueOptions = ['Shankill Leisure Centre', 'Omagh Leisure Centre', 'Other'];

  // 15-min options 07:00–23:45
  const timeOptions = [];
  for (let hour = 7; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      timeOptions.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
    }
  }

  const opponentOptions = ['Belfast United FC', 'Dundela FC', 'Omagh FC', 'Inter FC'];
</script>

<section class="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
  <h2 class="mb-4 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-800">Match Details</h2>

  <div class="space-y-4">
    <!-- Venue -->
    <div>
      <label for="venue-select" class="block text-sm font-medium text-gray-700">Venue</label>
      <select
        id="venue-select"
        class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        bind:value={$selectedVenue}
        aria-label="Venue"
      >
        {#each venueOptions as venue}
          <option value={venue}>{venue}</option>
        {/each}
      </select>

      {#if $selectedVenueType === 'other'}
        <input
          class="mt-2 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
          placeholder="Enter Venue"
          bind:value={$customVenue}
          aria-label="Custom venue"
        />
      {/if}
    </div>

    <!-- Opponent -->
    <div>
      <label for="opponent" class="block text-sm font-medium text-gray-700">Opponent</label>
      <select
        id="opponent"
        class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        bind:value={$selectedOpponent}
        aria-label="Opponent"
      >
        <option value="">--</option>
        {#each opponentOptions as opponent}
          <option value={opponent}>{opponent}</option>
        {/each}
      </select>
    </div>

    <!-- Date -->
    <div>
      <label for="match-date" class="block text-sm font-medium text-gray-700">Date</label>
      <input
        id="match-date"
        type="date"
        class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        bind:value={$matchDate}
        aria-label="Match date"
      />
    </div>

    <!-- Time & meet -->
    <div>
      <label for="match-time" class="block text-sm font-medium text-gray-700">Time</label>
      <select
        id="match-time"
        class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        bind:value={$kickoffTime}
        aria-label="Kickoff time"
      >
        <option value="">--</option>
        {#each timeOptions as time}
          <option value={time}>{time}</option>
        {/each}
      </select>

      {#if $meetingTime}
        <div class="mt-2 rounded p-2 font-bold text-red-700" aria-live="polite">
          {`MEET AT: ${$meetingTime}`}
        </div>
      {/if}
    </div>

    <!-- Kit -->
    <div>
      <label for="kit-select" class="block text-sm font-medium text-gray-700">KIT</label>
      <select
        id="kit-select"
        class="mt-1 mb-2 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        bind:value={$selectedKit}
        aria-label="Kit selection"
      >
        <option value="HOME">HOME</option>
        <option value="AWAY">AWAY</option>
      </select>

      <KitBadges />
    </div>
  </div>
</section>
