import { writable, get } from "svelte/store";

export const audioPlayer = writable();
export const status = writable("default");
export const isPlaying = writable(false);
export const index = writable(0);
export const search = writable(''); 
export const currentPage = writable(1); 

export const trackList = writable([
  {
		title: 'Demons',
		artist: 'Imagine Dragons',
		file: 'https://cdns-preview-f.dzcdn.net/stream/c-f69a51d64ef9368d16bb9c880ab4a949-6.mp3',
		image: 'https://e-cdns-images.dzcdn.net/images/cover/7e8314f4280cffde363547a495a260bc/56x56-000000-80-0-0.jpg'
	},
]);

export const addTrack = (track) => {
  trackList.update((v) => [...v, track]);
};

export const setTrack = (trackIndex) => {
  index.set(trackIndex);
};

