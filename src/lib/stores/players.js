import { get, writable } from 'svelte/store';

const LS_KEY = 'players:v1';

// Default data used only the first time (or if storage is empty/corrupt)
const DEFAULT_PLAYERS = [
  { id: 1, name: 'Matthew McErlain', number: 1, isAvailable: true },
  { id: 2, name: 'Horatiu Puica', number: 22, isAvailable: true },
  { id: 3, name: 'Darius Roohi', number: 5, isAvailable: false },
  { id: 4, name: 'Johnny Gibson', number: 2, isAvailable: true },
  { id: 5, name: 'Ryan McMenemy', number: 67, isAvailable: false },
  { id: 6, name: 'Nathan Best', number: 7, isAvailable: true },
  { id: 7, name: 'Josh Lowry', number: 8, isAvailable: true },
  { id: 8, name: 'Ernestas Verenka', number: 11, isAvailable: true },
  { id: 9, name: 'Elton Tavares', number: 6, isAvailable: true },
  { id: 10, name: 'Luis Miguel', number: 14, isAvailable: false },
  { id: 11, name: 'Gustavo Brida', number: 12, isAvailable: true },
  { id: 12, name: 'Daniel Hamilton', number: 9, isAvailable: true },
  { id: 13, name: 'Ryon Leyshon', number: 3, isAvailable: true },
  { id: 14, name: 'Chris Boyle', number: 18, isAvailable: false },
];

// Small helper that loads/saves JSON with error safety
function loadFromLocalStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    // sanity check: must be an array of objects with id
    if (!Array.isArray(parsed)) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Create a writable that persists to localStorage
function persistedArrayStore(key, initialArray) {
  const startValue =
    typeof window !== 'undefined' ? loadFromLocalStorage(key, initialArray) : initialArray; // in case you ever run this outside the browser

  const { subscribe, set, update } = writable(startValue);

  // Persist on every change
  subscribe((val) => {
    if (typeof window !== 'undefined') saveToLocalStorage(key, val);
  });

  return { subscribe, set, update };
}

export const playerStore = persistedArrayStore(LS_KEY, DEFAULT_PLAYERS);

export function togglePlayerAvailability(playerId) {
  playerStore.update((playerList) => {
    const playerIndex = playerList.findIndex((player) => player.id === playerId);
    if (playerIndex === -1) return playerList;

    const updatedList = playerList.slice(); // shallow-copy array once
    updatedList[playerIndex] = {
      ...playerList[playerIndex],
      isAvailable: !playerList[playerIndex].isAvailable,
    }; // replace only one item
    return updatedList;
  });
}

export function removePlayerById(playerId) {
  playerStore.update((playerList) => {
    const playerIndex = playerList.findIndex((player) => player.id === playerId);
    if (playerIndex === -1) return playerList;

    const updatedList = playerList.slice();
    updatedList.splice(playerIndex, 1); // remove the one element
    return updatedList;
  });
}

function computeNextId() {
  const list = get(playerStore);
  const maxId = list.reduce((max, player) => Math.max(max, player.id), 0);
  return maxId + 1;
}

export function addPlayer(name, number) {
  playerStore.update((playerList) => [
    ...playerList,
    { id: computeNextId(), name, number: +number, isAvailable: true },
  ]);
}

export function reorderPlayers(draggedId, targetId) {
  playerStore.update((playerList) => {
    const from = playerList.findIndex((player) => player.id === draggedId);
    const to = playerList.findIndex((player) => player.id === targetId);
    if (from === -1 || to === -1) return playerList;
    const copy = [...playerList];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
  });
}
