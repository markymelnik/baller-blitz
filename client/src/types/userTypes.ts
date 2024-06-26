export interface UserDetails {
  id: number;
  email: string;
  role: string;
  is_verified: boolean;
  username: string;
}

export interface UserState {
  userDetails: UserDetails | null;
}

export interface BackendUser {
  user: UserDetails;
  accessToken: string;
}

export interface UserStatistics {
  total_predictions: number;
  correct_predictions: number;
  accuracy_percentage: number;
}

export interface UserProfileInfo {
  id: number;
  email: string;
  username: string;
}