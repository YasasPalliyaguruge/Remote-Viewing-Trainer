export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Expert = 'Expert',
  Master = 'Master',
}

export enum Category {
  Object = 'Sensory-rich Object',
  Location = 'Global Location',
  Event = 'Temporal Event',
}

export enum PracticeMode {
  Solo = 'Solo Blind Trial',
  Timed = 'Timed Challenge',
  Tournament = 'Tournament',
  Collaborative = 'Collaborative Session',
}

export interface Target {
  id: string;
  description: string;
  difficulty: Difficulty;
  category: Category;
  randomnessMarker: number;
}

export interface SessionResult {
  target: Target;
  userDescription: string;
}

export interface AIAnalysis {
  similarityScore: number;
  evidenceScore: number;
  distinctivenessScore: number;
  summary: string;
  attributeMatches: {
    attribute: string;
    targetPresence: boolean;
    userPresence: boolean;
    match: boolean;
  }[];
}
