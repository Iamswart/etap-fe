import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

export interface LearningProgress {
    completedAt: string;
  }

export interface LeaderboardEntry {
  id: string;
  name: string;
  email: string;
  learningProgress: LearningProgress[];
}

export interface PaginatedResponse {
  leaderboard: LeaderboardEntry [];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export const useFetchLeaderboard = (
  topicSlug: string,
  page: number,
  limit: number
) => {
  const getLeaderboardApiClient = new APIClient(
    `/topics/${topicSlug}/leaderboard`
  );
  return useQuery<PaginatedResponse, Error>(
    ["FETCH_TOPIC_LEADERBOARD", topicSlug, page, limit],
    () => {
      return getLeaderboardApiClient.getAll<PaginatedResponse>({
        params: { page, limit },
      });
    },
    {
      keepPreviousData: true,
    }
  );
};
