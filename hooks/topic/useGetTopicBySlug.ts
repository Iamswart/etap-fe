import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

const topicApiClient = new APIClient("/topics");

export interface TopicResponse {
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

export const useFetchSingleTopic = (topicSlug: string) => {

  return useQuery<TopicResponse, Error>(
    ["GET_SINGLE_TOPIC", topicSlug],
    () => {
      return topicApiClient.get<TopicResponse>(topicSlug);
    }
  );
};
