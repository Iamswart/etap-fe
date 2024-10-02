'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaBook } from 'react-icons/fa';
import { format } from 'date-fns';
import { SubjectsResponse } from '@/hooks/subject/useGetAllSubjects';

type SubjectCardProps = {
  subject: SubjectsResponse; 
  onView: (slug: string) => void;
};

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onView }) => {
  return (
    <Card className="bg-white rounded-md shadow-sm hover:shadow-lg transition">
      <CardHeader className="flex items-center space-x-3">
        <FaBook className="text-[#194A7A]" size={24} />
        <CardTitle className="text-lg font-semibold">{subject.title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-2">
        <p className="text-gray-700">{subject.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Date added: {format(new Date(subject.createdAt), 'do MMM yyyy')}
        </p>
        <div className="mt-4">
          <Button
            variant="default"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => onView(subject.slug)}
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;

