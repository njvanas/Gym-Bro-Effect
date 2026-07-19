export type Pillar = 'home' | 'training' | 'fuel' | 'tools';

export function pillarLabel(pillar: Pillar): string {
  switch (pillar) {
    case 'home':
      return 'Home';
    case 'training':
      return 'Bro Training';
    case 'fuel':
      return 'Bro Fuel';
    case 'tools':
      return 'Bro Tools';
    default: {
      const exhaustive: never = pillar;
      return exhaustive;
    }
  }
}
