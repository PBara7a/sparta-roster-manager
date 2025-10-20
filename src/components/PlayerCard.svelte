<script>
  import { togglePlayerAvailability, removePlayerById } from '../lib/stores/players';
  export let player;
  export let onDragStart = (e, player) => {};
  export let onDragEnd = (e) => {};

  let grabbed = false;

  function handleDragStart(e) {
    grabbed = true;
    if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
    onDragStart(e, player);
  }

  function handleDragEnd(e) {
    grabbed = false;
    onDragEnd(e);
  }
</script>

<div
  class="flex cursor-move items-center justify-between rounded-lg border border-gray-200 p-3 shadow-sm transition hover:border-indigo-400"
  draggable="true"
  data-id={player.id}
  role="listitem"
  aria-label={`Drag to reorder: #${player.number} ${player.name}`}
  aria-grabbed={grabbed}
  on:dragstart={handleDragStart}
  on:dragend={handleDragEnd}
>
  <div class="flex flex-grow items-center gap-4">
    <p class="text-lg font-semibold text-gray-800">#{player.number} {player.name}</p>
    {#if player.isAvailable}
      <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700"
        >Available</span
      >
    {:else}
      <span class="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700"
        >Unavailable</span
      >
    {/if}
  </div>

  <div class="flex items-center">
    <!-- Availability toggle -->
    <label class="relative mr-4 inline-block h-6 w-12">
      <input
        type="checkbox"
        class="peer absolute inset-0 h-6 w-12 opacity-0"
        checked={player.isAvailable}
        draggable="false"
        on:mousedown|stopPropagation
        on:dragstart|stopPropagation
        on:change={() => togglePlayerAvailability(player.id)}
      />
      <!-- background reflects availability -->
      <span
        class="absolute inset-0 rounded-full bg-red-500
               transition-[background-color] duration-300 peer-checked:bg-emerald-500"
      ></span>
      <!-- knob -->
      <span
        class="absolute bottom-[3px] left-[3px] h-[18px] w-[18px] cursor-pointer rounded-full bg-white
               transition-transform duration-300 peer-checked:translate-x-[24px]"
      ></span>
    </label>

    <!-- Remove button -->
    <button
      type="button"
      title="Remove"
      aria-label={`Remove player ${player.name}`}
      draggable="false"
      on:mousedown|stopPropagation
      on:dragstart|stopPropagation
      on:click={() => removePlayerById(player.id)}
      class="cursor-pointer rounded-full p-2">🗑️</button
    >
  </div>
</div>
