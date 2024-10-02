import { useMutation } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

interface MarkTopicResponse {
  id: string;
  completed: boolean;
  completedAt: Date;
  userId: string;
  topicId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const useMarkTopic = (topicSlug: string) => {
  const markTopicApiClient = new APIClient(`/topics/${topicSlug}/complete`);

  return useMutation<MarkTopicResponse, Error>({
    mutationFn: () => markTopicApiClient.post<null, MarkTopicResponse>(null),
    mutationKey: ["MARK_TOPIC_COMPLETE", topicSlug],
  });
};

