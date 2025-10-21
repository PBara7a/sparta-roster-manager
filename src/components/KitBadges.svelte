<script>
  import { kitDetails } from '../lib/stores/matchDetails';
</script>

<ul class="flex space-x-2">
  {#each Object.entries($kitDetails) as [part, kit]}
    <li
      class="inline-block rounded px-2 py-1 font-bold"
      class:border={kit.border}
      style="background-color:{kit.colour}; color:{kit.text};"
    >
      {part}: {kit.colour.toUpperCase()}
    </li>
  {/each}
</ul>
