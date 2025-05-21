export type PostulationStatus = 'applied' | 'interview' | 'technical' | 'offer' | 'rejected' | 'accepted';


// Add translation keys to use with the i18n system instead
export const STATUS_TRANSLATION_KEYS: Record<PostulationStatus, string> = {
  applied: 'dashboard.stats.status.applied',
  interview: 'dashboard.stats.status.interview',
  technical: 'dashboard.stats.status.technical',
  offer: 'dashboard.stats.status.offer',
  rejected: 'dashboard.stats.status.rejected',
  accepted: 'dashboard.stats.status.accepted'
};
export interface Postulation {
  /** Unique identifier for the postulation */
  id: string;
  /** Company name, required, min length 1 */
  company: string;
  /** Position title, required, min length 1 */
  position: string;
  /** Current status of the application */
  status: PostulationStatus;
  /** Application date in ISO format (YYYY-MM-DD) */
  date: string;
  /** Optional URL to the job posting */
  url?: string;
  /** Optional notes about the application */
  notes?: string;
  /** Optional recruiter contact information */
  recruiterContact?: string;
  /** Whether a CV was sent with the application */
  sentCV?: boolean;
  /** Whether an email was sent for the application */
  sentEmail?: boolean;
  /** Creation timestamp in ISO format */
  createdAt: string;
  /** Last update timestamp in ISO format */
  updatedAt: string;
}

export interface PostulationState {
  postulations: Postulation[];
  loading: boolean;
 error: string | null;
 addPostulation: (newPostulation: Omit<Postulation, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
 updatePostulation: (id: string, updatedFields: Partial<Postulation>) => Promise<void>;
 deletePostulation: (id: string) => Promise<void>;
 getPostulation: (id: string) => Postulation | undefined;
  checkDuplicate: (company: string, position: string) => boolean;
 clearError: () => void;
}


export const getStatusColors = (status: PostulationStatus, isDarkMode: boolean): string => {
  const colors = {
    applied: isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800',
    interview: isDarkMode ? 'bg-purple-900 text-purple-100' : 'bg-purple-100 text-purple-800',
    technical: isDarkMode ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100 text-yellow-800',
    offer: isDarkMode ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800',
    rejected: isDarkMode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800',
    accepted: isDarkMode ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'
  };

  return colors[status];
};
