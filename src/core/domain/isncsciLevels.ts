export type SensoryLevel =
  'C2' | 'C3' | 'C4' | 
  'C5' | 'C6' | 'C7' | 'C8' | 'T1' |
  'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8' | 'T9' | 'T10' | 'T11' | 'T12' | 'L1' |
  'L2' | 'L3' | 'L4' | 'L5' | 'S1' |
  'S2' | 'S3' | 'S4_5';

export const SensoryLevels: SensoryLevel[] = [
  'C2', 'C3', 'C4', 
  'C5', 'C6', 'C7', 'C8', 'T1',
  'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'L1',
  'L2', 'L3', 'L4', 'L5', 'S1',
  'S2', 'S3', 'S4_5',
];

export const MotorLevels = [
  'C5', 'C6', 'C7', 'C8', 'T1',
  'L2', 'L3', 'L4', 'L5', 'S1',
];

export type MotorLevel =
  'C5' | 'C6' | 'C7' | 'C8' | 'T1' |
  'L2' | 'L3' | 'L4' | 'L5' | 'S1';