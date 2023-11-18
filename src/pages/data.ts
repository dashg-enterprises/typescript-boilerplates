export const data = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 1,
    y: 1,
  },
  {
    x: 2,
    y: 2,
  },
  {
    x: 3,
    y: 3,
  },
  {
    x: 4,
    y: 5,
  },
  {
    x: 5,
    y: 8,
  },
  {
    x: 6,
    y: 13,
  },
  {
    x: 7,
    y: 21,
  },
  {
    x: 8,
    y: 13,
  },
  {
    x: 9,
    y: 8,
  },
  {
    x: 10,
    y: 5,
  },
  {
    x: 11,
    y: 3,
  },
  {
    x: 12,
    y: 2,
  },
];

export const ACCELERATION_DUE_TO_EARTH_GRAVITY = 9.80665;
export type velocityFn = (times?: number[]) => {y: number, x: number}[];
export const velocityInFreeFall: velocityFn = times => (times || createPoints(12)).map(t => ({y: ACCELERATION_DUE_TO_EARTH_GRAVITY * t, x: t}));

function createPoints(n: number) {
  return [...Array(12).keys()];
}