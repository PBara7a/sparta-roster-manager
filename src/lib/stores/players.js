import { writable } from 'svelte/store';

export const playerStore = writable([
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
]);

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

let nextId = 15; // keep track of next ID to assign
export function addPlayer(name, number) {
  playerStore.update((playerList) => [
    ...playerList,
    { id: nextId++, name, number: +number, isAvailable: true },
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
