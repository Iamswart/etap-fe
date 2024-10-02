import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

const subjectApiClient = new APIClient("/subjects");

export interface Topic {
  id: string;
  title: string;
  description: string;
  slug: string;
  videoUrl: string;
  subjectId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubjectResponse {
  id: string;
  title: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  topics: Topic[];
}

export const useFetchSingleSubject = (subjectSlug: string) => {

  return useQuery<SubjectResponse, Error>(
    ["GET_SINGLE_SUBJECT", subjectSlug],
    () => {
      return subjectApiClient.get<SubjectResponse>(subjectSlug);
    }
  );
};
