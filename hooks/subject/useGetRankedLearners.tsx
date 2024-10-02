import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

export interface Learners {
  id: string;
  name: string;
  email: string;
  completedTopics: string;
  completionRate: number;
  lastCompletedAt: Date;
}

export interface PaginatedResponse {
  rankedLearners: Learners[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export const useFetchRankedLearners = (
  subjectSlug: string,
  page: number,
  limit: number
) => {
  const getRankedLearnersApiClient = new APIClient(
    `/subjects/${subjectSlug}/ranked-learners`
  );
  return useQuery<PaginatedResponse, Error>(
    ["FETCH_RANKED_LEARNERS", subjectSlug, page, limit],
    () => {
      return getRankedLearnersApiClient.getAll<PaginatedResponse>({
        params: { page, limit },
      });
    },
    {
      keepPreviousData: true,
    }
  );
};
