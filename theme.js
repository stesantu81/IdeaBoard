export const colors = {
  background: '#0A0A0A',
  card: '#1C1C1E',
  text: '#F5F5F7',
  textMuted: '#9A9A9E',
  accent: '#2563EB',
  onAccent: '#FFFFFF',
  border: '#2E2E30',
  completedBg: '#16A34A',  
  danger:'#f87171',      // bordi sottili delle card
};

{/*Inizializzazione palette colori*/}

const tagPalette = [
  { bg: '#1E3A8A', text: '#93C5FD' },  // blu
  { bg: '#14532D', text: '#86EFAC' },  // verde
  { bg: '#78350F', text: '#FCD34D' },  // ambra
  { bg: '#7F1D1D', text: '#FCA5A5' },  // rosso
  { bg: '#4C1D95', text: '#C4B5FD' },  // viola
  { bg: '#134E4A', text: '#5EEAD4' },  // verde acqua
];

export function getTagColors(tag) {
  const normalized = tag.toLowerCase();
  let sum = 0;
  for (let i = 0; i < normalized.length; i++) {
    sum += normalized.charCodeAt(i);
  }
  return tagPalette[sum % tagPalette.length];
};