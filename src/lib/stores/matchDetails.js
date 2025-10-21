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
  return `${formattedHours}:${formattedMinutes}`;
});

export const kitDetails = derived(selectedKit, ($selectedKit) => {
  if ($selectedKit === 'HOME') {
    return {
      TOP: { colour: 'red', text: 'white' },
      BOTTOM: { colour: 'black', text: 'white' },
      SOCKS: { colour: 'black', text: 'white' },
    };
  }

  return {
    TOP: { colour: 'white', text: 'black', border: true },
    BOTTOM: { colour: 'white', text: 'black', border: true },
    SOCKS: { colour: 'white', text: 'black', border: true },
  };
});

export const matchDetails = derived(
  [selectedVenue, customVenue, matchDate, kickoffTime, meetingTime, selectedKit, kitDetails],
  ([
    $selectedVenue,
    $customVenue,
    $matchDate,
    $kickoffTime,
    $meetingTime,
    $selectedKit,
    $kitDetails,
  ]) => ({
    venue: $selectedVenue === 'Other' ? $customVenue : $selectedVenue,
    date: $matchDate,
    kickoffTime: $kickoffTime,
    meetingTime: $meetingTime,
    kit: {
      type: $selectedKit,
      details: $kitDetails,
    },
  })
);
