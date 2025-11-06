import { writable, derived } from 'svelte/store';

export const selectedVenue = writable('Shankill Leisure Centre');
export const customVenue = writable('');
export const matchDate = writable('');
export const kickoffTime = writable(''); // "HH:MM"
export const meetingTime = writable(''); // "HH:MM"
export const selectedKit = writable('HOME'); // 'HOME' | 'AWAY'
export const homeOrAway = writable('HOME'); // 'HOME' | 'AWAY'
export const selectedOpponent = writable('');

// Derived conveniences
export const selectedVenueType = derived(selectedVenue, ($selectedVenue) =>
  $selectedVenue === 'Other' ? 'other' : 'preset'
);

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
  [
    selectedVenue,
    selectedOpponent,
    customVenue,
    matchDate,
    kickoffTime,
    meetingTime,
    homeOrAway,
    selectedKit,
    kitDetails,
  ],
  ([
    $selectedVenue,
    $selectedOpponent,
    $customVenue,
    $matchDate,
    $kickoffTime,
    $meetingTime,
    $homeOrAway,
    $selectedKit,
    $kitDetails,
  ]) => ({
    venue: $selectedVenue === 'Other' ? $customVenue : $selectedVenue,
    opponent: $selectedOpponent,
    date: $matchDate,
    kickoffTime: $kickoffTime,
    meetingTime: $meetingTime,
    homeOrAway: $homeOrAway,
    kit: {
      type: $selectedKit,
      details: $kitDetails,
    },
  })
);
