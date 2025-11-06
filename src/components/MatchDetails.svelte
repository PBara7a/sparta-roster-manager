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
    homeOrAway,
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

  // Filtered meeting time options - only times before kickoff
  $: meetingTimeOptions = $kickoffTime ? timeOptions.filter((time) => time < $kickoffTime) : [];

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

    <!-- Time -->
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
    </div>

    <!-- Meet -->
    <div>
      <label for="meet-time" class="block text-sm font-medium text-gray-700">Meet at</label>
      <select
        id="meet-time"
        class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        bind:value={$meetingTime}
        aria-label="Meet time"
      >
        <option value="">--</option>
        {#each meetingTimeOptions as time}
          <option value={time}>{time}</option>
        {/each}
      </select>
    </div>

    <div class="flex gap-4">
      <!-- Home/Away -->
      <div class="w-1/2">
        <label for="home-away-select" class="text-sm font-medium text-gray-700">Home/Away</label>
        <select
          id="home-away-select"
          class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
          bind:value={$homeOrAway}
          aria-label="Home or Away"
        >
          <option value="HOME">HOME</option>
          <option value="AWAY">AWAY</option>
        </select>
      </div>

      <!-- Kit -->
      <div class="w-1/2">
        <label for="kit-select" class="text-sm font-medium text-gray-700">KIT</label>
        <select
          id="kit-select"
          class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
          bind:value={$selectedKit}
          aria-label="Kit selection"
        >
          <option value="HOME">HOME</option>
          <option value="AWAY">AWAY</option>
        </select>
      </div>
    </div>
    <KitBadges />
  </div>
</section>
