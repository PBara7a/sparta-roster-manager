<script>
  import { playerStore, reorderPlayers as reorderPlayerList } from '../lib/stores/players';
  import PlayerCard from './PlayerCard.svelte';

  let playerListElement;
  let activeDraggingPlayerId = null;
  let highlightedElement = null; // track the element we decorated for insert hint

  function startDrag(event, player) {
    activeDraggingPlayerId = player.id;
    event.dataTransfer?.setData('text/plain', String(player.id));
    event.currentTarget.classList.add('opacity-40', 'scale-[0.98]');
  }

  function removeInsertHint() {
    if (highlightedElement) {
      highlightedElement.classList.remove(
        'insert-hint',
        'border-t-[3px]',
        'border-indigo-500',
        'pt-[10px]'
      );
      highlightedElement = null;
    }
  }

  function endDrag(event) {
    event.currentTarget.classList.remove('opacity-40', 'scale-[0.98]');
    activeDraggingPlayerId = null;
    removeInsertHint();
  }

  function findInsertPosition(mouseY) {
    const draggableElements = [
      ...playerListElement.querySelectorAll('[draggable="true"]:not(.opacity-40)'),
    ];
    let closestElement = { offset: Number.NEGATIVE_INFINITY, element: null };
    draggableElements.forEach((child) => {
      const boundingBox = child.getBoundingClientRect();
      const offset = mouseY - boundingBox.top - boundingBox.height / 2;
      if (offset < 0 && offset > closestElement.offset) {
        closestElement = { offset, element: child };
      }
    });
    return closestElement.element;
  }

  function handleDragOver(event) {
    event.preventDefault();
    const insertPosition = findInsertPosition(event.clientY);
    if (insertPosition !== highlightedElement) {
      removeInsertHint();
      if (insertPosition) {
        highlightedElement = insertPosition;
        insertPosition.classList.add(
          'insert-hint',
          'border-t-[3px]',
          'border-indigo-500',
          'pt-[10px]'
        );
      }
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    const insertPosition = findInsertPosition(event.clientY);
    if (!activeDraggingPlayerId) return;

    const targetPlayerId = insertPosition ? Number(insertPosition.dataset.id) : null;
    if (targetPlayerId !== null) reorderPlayerList(activeDraggingPlayerId, targetPlayerId);

    activeDraggingPlayerId = null;
    removeInsertHint();
  }
</script>

<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
  <h2 class="mb-4 text-xl font-bold text-gray-800" aria-live="polite">
    Current Roster ({$playerStore.length} Players)
  </h2>

  <div
    bind:this={playerListElement}
    class="custom-scrollbar max-h-[500px] space-y-3 overflow-y-auto"
    on:dragover={handleDragOver}
    on:drop={handleDrop}
    role="list"
  >
    {#each $playerStore as player (player.id)}
      <PlayerCard {player} onDragStart={startDrag} onDragEnd={endDrag} />
    {/each}
  </div>
</div>
