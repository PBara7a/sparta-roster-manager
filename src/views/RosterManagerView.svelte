<script>
  import AddPlayerForm from '../components/AddPlayerForm.svelte';
  import PlayerList from '../components/PlayerList.svelte';
  import MatchDetails from '../components/MatchDetails.svelte';
  import SelectionSheet from '../components/SelectionSheet.svelte';
  import html2canvas from 'html2canvas';

  const title = 'Sparta Futsal Roster';

  let sheetEl;

  async function exportRosterImage() {
    if (!sheetEl) return;

    const clone = sheetEl.cloneNode(true);

    Object.assign(clone.style, {
      position: 'fixed',
      left: '-100000px',
      top: '0',
      width: '1280px', // A4 landscape at 96dpi
      height: '1080px', // A4 landscape at 96dpi
      backgroundColor: '#fff',
      display: 'block',
    });

    document.body.appendChild(clone);

    try {
      const canvas = await html2canvas(clone);
      // Create a link and trigger download
      const link = document.createElement('a');
      link.download = 'futsal-selection.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('PDF export failed:', e);
    } finally {
      clone.remove();
    }
  }
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
        on:click={exportRosterImage}
        class="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
      >
        Export Roster
      </button>
    </div>
  </main>

  <!-- Hidden SelectionSheet for export -->
  <div
    style="position: absolute; left: -9999px; top: 0; width: 1754px; height: 1240px; overflow: hidden;"
  >
    <div bind:this={sheetEl}>
      <SelectionSheet width={1280} height={1080} />
    </div>
  </div>
</div>
