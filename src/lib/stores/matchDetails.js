import { writable, derived } from 'svelte/store';

export const selectedVenue = writable('Shankill Leisure Centre');
export const customVenue = writable('');
export const matchDate = writable('');
export const kickoffTime = writable(''); // "HH:MM"
export const selectedKit = writable('HOME'); // 'HOME' | 'AWAY'

// Derived conveniences
export const selectedVenueType = derived(selectedVenue, ($selectedVenue) =>
  $selectedVenue === 'Other' ? 'other' : 'preset'
);

export const meetingTime = derived(kickoffTime, ($kickoffTime) => {
  if (!$kickoffTime) return '';
  const [hours, minutes] = $kickoffTime.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  date.setHours(date.getHours() - 1);
  const formattedHours = String(date.getHours()).padStart(2, '0');
  const formattedMinutes = String(date.getMinutes()).padStart(2, '0');
  return `MEET AT: ${formattedHours}:${formattedMinutes}`;
});

export const kitDetails = derived(selectedKit, ($selectedKit) => {
  if ($selectedKit === 'HOME') {
    return [
      { part: 'TOP', bg: 'red', text: 'white' },
      { part: 'BOTTOM', bg: 'black', text: 'white' },
      { part: 'SOCKS', bg: 'black', text: 'white' },
    ];
  }
  return [
    { part: 'TOP', bg: 'white', text: 'black', border: true },
    { part: 'BOTTOM', bg: 'white', text: 'black', border: true },
    { part: 'SOCKS', bg: 'white', text: 'black', border: true },
  ];
});

// Optional: read-only snapshot of everything for places that want the whole object
export const matchDetails = derived(
  [selectedVenue, customVenue, matchDate, kickoffTime, selectedKit, selectedVenueType],
  ([$selectedVenue, $customVenue, $matchDate, $kickoffTime, $selectedKit, $selectedVenueType]) => ({
    venueType: $selectedVenueType,
    venue: $selectedVenue,
    venueOther: $customVenue,
    date: $matchDate,
    time: $kickoffTime,
    kit: $selectedKit,
  })
);
