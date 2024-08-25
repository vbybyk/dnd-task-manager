export const generateColor = (str?: string) => {
  if (!str) {
    return "#e2e9e9";
  }
  const hueRange = [0, 360];
  const saturationRange = [45, 55];
  const lightnessRange = [45, 60];

  const getHashOfString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
  };

  const normalizeHash = (hash: number, min: number, max: number) => {
    return Math.floor((hash % (max - min)) + min);
  };

  const generateHSL = (str: string) => {
    const hash = getHashOfString(str);
    const h = normalizeHash(hash, hueRange[0], hueRange[1]);
    const s = normalizeHash(hash, saturationRange[0], saturationRange[1]);
    const l = normalizeHash(hash, lightnessRange[0], lightnessRange[1]);
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  return generateHSL(str);
};
