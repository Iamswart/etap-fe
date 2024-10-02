import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

const allSubjectsApiClient = new APIClient("/subjects");

export interface SubjectsResponse {
  id: string;
  title: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PaginatedResponse {
  subjects: SubjectsResponse[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export const useFetchAllSubjects = (page: number, limit: number) => {
  return useQuery<PaginatedResponse, Error>(
    ["FETCH_ALL_SUBJECTS", page, limit],
    () => {
      return allSubjectsApiClient.getAll<PaginatedResponse>({
        params: { page, limit },
      });
    },
    {
      keepPreviousData: true,
    }
  );
};
