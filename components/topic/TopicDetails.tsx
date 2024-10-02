import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Leaderboard from "@/components/reusables/LeaderBoard";
import { Topic } from "@/hooks/subject/useGetSubjectBySlug";
import { User } from "@/contexts/Auth";
import { RoleEnum } from "@/constants/type";
import { Button } from "@/components/ui/button";
import { useMarkTopic } from "@/hooks/topic/useMarkTopic";
import { useFetchCompletionStatus } from "@/hooks/topic/useGetCompletionStatus";
import { useQueryClient } from "@tanstack/react-query";

type TopicDetailsProps = {
  topic: Topic;
  user: User | null;
};

const TopicDetails: React.FC<TopicDetailsProps> = ({ topic, user }) => {
  const queryClient = useQueryClient();
  const showLeaderboard =
    user && (user.role === RoleEnum.ADMIN || user.role === RoleEnum.TEACHER);
  const { mutate: markTopicComplete, isLoading: isMarking } = useMarkTopic(
    topic.slug
  );
  const { data: completionStatus, isLoading: isLoadingStatus } =
    useFetchCompletionStatus(topic.slug);

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  const handleMarkComplete = () => {
    markTopicComplete(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries(["GET_COMPLETION_STATUS", topic.slug]);
      }
    });
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{topic.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{topic.description}</p>
          <div className="aspect-video w-full bg-gray-200 rounded-md mb-4">
            <iframe
              src={getYouTubeEmbedUrl(topic.videoUrl)}
              title={topic.title}
              className="w-full h-full rounded-md"
              allowFullScreen
            ></iframe>
          </div>
          {!isLoadingStatus && (completionStatus?.completed ? (
            <p className="text-green-600 font-semibold">
              You have completed this topic on{" "}
              {new Date(completionStatus.completedAt).toLocaleDateString()}
            </p>
          ) : (
            <Button onClick={handleMarkComplete} disabled={isMarking}>
              {isMarking ? "Marking..." : "Mark as Complete"}
            </Button>
          ))}
        </CardContent>
      </Card>

      {showLeaderboard && <Leaderboard type="topic" id={topic.slug} />}
    </div>
  );
};

export default TopicDetails;
