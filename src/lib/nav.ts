export type Pillar = 'home' | 'training' | 'fuel' | 'tools' | 'who';

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
    case 'who':
      return 'Who is Bro?';
    default: {
      const exhaustive: never = pillar;
      return exhaustive;
    }
  }
}
