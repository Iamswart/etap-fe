import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

export interface TopicResponse {
  userId: string;
  subjectId: string;
  totalTopics: number;
  completedTopics: number;
  progressPercentage: number;
}

export const useGetUserProgress = (subjectId: string) => {
  const userProgressApiClient = new APIClient(`/progress/user-progress`);

  return useQuery<TopicResponse[], Error>({
    queryKey: ["GET_USER_PROGRESS", subjectId],
    queryFn: () =>
      userProgressApiClient.getWithQuery<TopicResponse[]>(
        `subjectId=${subjectId}`
      ),
  });
};
