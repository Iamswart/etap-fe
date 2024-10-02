import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

export interface TopicResponse {
  topicId: string;
  topicTitle: string;
  completed: boolean;
  completedAt: Date;
}

export const useFetchCompletionStatus = (topicSlug: string) => {
  const completionStatusApiClient = new APIClient(`/topics/${topicSlug}/completion-status`);

  return useQuery<TopicResponse, Error>(["GET_COMPLETION_STATUS", topicSlug], () => {
    return completionStatusApiClient.get<TopicResponse>('');
  });
};
