"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import AppLoader from "@/components/ui/AppLoader";
import {
  useFetchRankedLearners,
  PaginatedResponse as SubjectPaginatedResponse,
  Learners,
} from "@/hooks/subject/useGetRankedLearners";
import {
  useFetchLeaderboard,
  PaginatedResponse as TopicPaginatedResponse,
  LeaderboardEntry,
} from "@/hooks/topic/useGetLeaderBoard";

type LeaderboardProps = {
  type: "subject" | "topic";
  id: string;
};

const ITEMS_PER_PAGE = 10;

type CombinedPaginatedResponse =
  | SubjectPaginatedResponse
  | TopicPaginatedResponse;

function isSubjectResponse(
  response: CombinedPaginatedResponse
): response is SubjectPaginatedResponse {
  return "rankedLearners" in response;
}

function isTopicResponse(
  response: CombinedPaginatedResponse
): response is TopicPaginatedResponse {
  return "leaderboard" in response;
}

function isSubjectLearner(
  learner: Learners | LeaderboardEntry
): learner is Learners {
  return "completionRate" in learner && "lastCompletedAt" in learner;
}

function isTopicLearner(
  learner: Learners | LeaderboardEntry
): learner is LeaderboardEntry {
  return "learningProgress" in learner;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ type, id }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const title =
    type === "subject" ? "Subject Leaderboard" : "Topic Leaderboard";

  const {
    data: subjectData,
    isLoading: isSubjectLoading,
    error: subjectError,
  } = useFetchRankedLearners(id, currentPage, ITEMS_PER_PAGE);

  const {
    data: topicData,
    isLoading: isTopicLoading,
    error: topicError,
  } = useFetchLeaderboard(id, currentPage, ITEMS_PER_PAGE);

  const isLoading = type === "subject" ? isSubjectLoading : isTopicLoading;
  const error = type === "subject" ? subjectError : topicError;
  const data: CombinedPaginatedResponse | undefined =
    type === "subject" ? subjectData : topicData;

  if (isLoading) return <AppLoader />;
  if (error) return <div>Error loading leaderboard: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const learners = isSubjectResponse(data)
    ? data.rankedLearners
    : data.leaderboard;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5">Rank</TableHead>
              <TableHead className="w-1/5">Learner</TableHead>
              <TableHead className="w-1/5">Email</TableHead>
              <TableHead className="w-1/5">
                {type === "subject" ? "Completion Rate" : "Completed At"}
              </TableHead>
              {type === "subject" && (
                <TableHead className="w-1/5">Last Completed</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {learners.map((learner, index) => (
              <TableRow key={learner.id} className="hover:bg-gray-100">
                <TableCell>
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <FaUser className="text-[#194A7A]" />
                  <span>{learner.name}</span>
                </TableCell>
                <TableCell>{learner.email}</TableCell>
                <TableCell>
                  {isSubjectLearner(learner)
                    ? `${learner.completionRate}%`
                    : isTopicLearner(learner) && learner.learningProgress && learner.learningProgress.length > 0
                    ? new Date(learner.learningProgress[0].completedAt).toLocaleDateString()
                    : "Not completed"}
                </TableCell>
                {isSubjectLearner(learner) && (
                  <TableCell>
                    {learner.lastCompletedAt
                      ? new Date(learner.lastCompletedAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-between items-center">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {data.totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(data.totalPages, prev + 1))
            }
            disabled={currentPage === data.totalPages}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;