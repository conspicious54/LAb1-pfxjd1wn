export interface FormData {
  email: string;
  incomeGoal: number;
  investment: number;
  productIdeas: 'exact' | 'some' | 'none';
  specificIdea?: string;
  interestAreas?: string;
  priorExperience?: 'amazon' | 'ecommerce' | 'research' | 'beginner';
  partnershipInterest?: boolean;
  mainGoal?: string;
  additionalNotes?: string;
}