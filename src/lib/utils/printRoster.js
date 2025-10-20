import { get } from 'svelte/store';
import { playerStore } from '../stores/players';
import { matchDetails, kitDetails, meetingTime } from '../stores/matchDetails';

export function printRoster() {
  const list = get(playerStore).filter((player) => player.isAvailable);
  const match = get(matchDetails);
  const kit = get(kitDetails);
  const meet = get(meetingTime);

  const venue = match.venueType === 'other' ? match.venueOther || '—' : match.venue;

  const windowRef = window.open('', 'Print', 'width=1200,height=800');
  windowRef.document.write(`
    <html><head><title>Print Roster</title>
    <style>
      body { font-family: sans-serif; margin: 16px; -webkit-print-color-adjust: exact; }
      h2 { margin: 12px 0 6px; }
      .box { border:1px solid #000; padding:4px; display:inline-block; min-width:240px; }
      .kit-box{padding:4px;color:white;font-weight:bold;margin-right:6px;display:inline-block;}
      ul{margin-top:6px}
    </style>
    </head><body>
      <h2>Venue</h2><div class="box">${venue}</div>
      <h2>Date</h2><div class="box">${match.date || '—'}</div>
      <h2>Time</h2><div class="box">${match.time || '—'}</div>
      ${meet ? `<h2>${meet}</h2>` : ''}
      <h2>KIT</h2>
      ${kit
        .map(
          (
            kitPart
          ) => `<span class="kit-box" style="background:${kitPart.bg}; color:${kitPart.text}; ${kitPart.border ? 'border:1px solid #000' : ''}">
        ${kitPart.part}: ${kitPart.bg.toUpperCase()}
      </span>`
        )
        .join('')}
      <h2>Available Players</h2>
      <ul>
        ${list.map((player) => `<li>#${player.number} ${player.name}</li>`).join('')}
      </ul>
    </body></html>
  `);
  windowRef.document.close();
  windowRef.focus();
  windowRef.print();
}
