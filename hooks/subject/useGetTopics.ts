import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Topic } from "./useGetSubjectBySlug";

interface PaginatedResponse {
  topics: Topic[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export const useFetchTopics = (
  subjectSlug: string,
  page: number,
  limit: number
) => {
  const getTopicsApiClient = new APIClient(`/subjects/${subjectSlug}/topics`);
  return useQuery<PaginatedResponse, Error>(
    ["FETCH_TOPICS", subjectSlug, page, limit],
    () => {
      return getTopicsApiClient.getAll<PaginatedResponse>({
        params: { page, limit },
      });
    },
    {
      keepPreviousData: true,
    }
  );
};
