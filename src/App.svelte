<script>
  import ExportView from './views/ExportView.svelte';
  import RosterManagerView from './views/RosterManagerView.svelte';
  import { currentView } from './lib/stores/navigation';
</script>

{#if $currentView === 'main'}
  <RosterManagerView />
{/if}

{#if $currentView === 'export'}
  <ExportView />
{/if}
