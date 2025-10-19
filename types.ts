
export interface Player {
  id: number;
  name: string;
  score: number;
  colorClasses: {
    bg: string;
    text: string;
    border: string;
    ring: string;
  };
}
