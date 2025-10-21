<script>
  import { onMount } from 'svelte';
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  import SelectionSheet from '../components/SelectionSheet.svelte';
  import { currentView } from '../lib/stores/navigation';

  let sheetWrap;
  let controlsEl;

  let scale = 1;

  const SHEET_W = 1754;
  const SHEET_H = 1240;

  let scaledW = SHEET_W;
  let scaledH = SHEET_H;

  function fit() {
    const margin = 24;
    const availableW = Math.max(320, window.innerWidth - margin * 2);
    const controlsH = controlsEl ? controlsEl.offsetHeight : 0;
    const availableH = Math.max(200, window.innerHeight - margin * 2 - controlsH);

    // Scale the preview only. The sheet itself is always A4 px.
    scale = Math.min(1, Math.max(0.2, Math.min(availableW / SHEET_W, availableH / SHEET_H)));
    scaledW = Math.round(SHEET_W * scale);
    scaledH = Math.round(SHEET_H * scale);
  }

  onMount(() => {
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  });

  async function exportPDF() {
    if (!sheetWrap) return;

    const clone = sheetWrap.cloneNode(true);

    Object.assign(clone.style, {
      position: 'fixed',
      left: '-100000px',
      top: '0',
      width: `${SHEET_W}px`,
      height: `${SHEET_H}px`,
      transform: 'none',
      backgroundColor: '#fff',
    });

    const wrapper = document.createElement('div');
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    try {
      const canvas = await html2canvas(clone);

      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const W = pdf.internal.pageSize.getWidth();
      const H = pdf.internal.pageSize.getHeight();
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, W, H, undefined, 'FAST');
      pdf.save('futsal-selection.pdf');
    } catch (e) {
      console.error('PDF export failed:', e);
    } finally {
      wrapper.remove();
    }
  }
</script>

<!-- Reserved preview area (scaled) -->
<div class="relative z-0 p-10" style="width:{scaledW}px; height:{scaledH}px;">
  <div
    bind:this={sheetWrap}
    class="absolute inset-0 origin-top-left"
    style="transform: scale({scale}); width:{SHEET_W}px; height:{SHEET_H}px;"
  >
    <SelectionSheet width={SHEET_W} height={SHEET_H} />
  </div>
</div>

<!-- Controls -->
<div bind:this={controlsEl} class="relative z-10 mt-3 px-4">
  <button
    on:click={exportPDF}
    class="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
  >
    Export PDF
  </button>
  <button
    on:click={() => currentView.set('main')}
    class="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
  >
    Back
  </button>
</div>
