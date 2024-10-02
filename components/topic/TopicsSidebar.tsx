'use client';

import React from 'react';
import { FaBook } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Topic } from '@/hooks/subject/useGetSubjectBySlug';

type TopicsSidebarProps = {
  topics: Topic[];
  selectedTopicId: string | null;
  onSelectTopic: (id: string) => void;
};

const TopicsSidebar: React.FC<TopicsSidebarProps> = ({ topics, selectedTopicId, onSelectTopic }) => {
  return (
    <div className="w-full max-w-xs bg-white rounded-md shadow-sm p-4">
      <h2 className="text-xl font-semibold mb-4">Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id} className="mb-2">
            <Button
              variant={selectedTopicId === topic.id ? 'secondary' : 'ghost'}
              className="w-full flex items-center justify-start gap-3 text-left"
              onClick={() => onSelectTopic(topic.id)}
            >
              <FaBook className="text-[#194A7A]" size={18} />
              <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                {topic.title}
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsSidebar;