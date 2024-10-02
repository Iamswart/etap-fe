'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubjectCard from '@/components/subject/SubjectCard';
import { withAuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { SubjectsResponse, useFetchAllSubjects } from '@/hooks/subject/useGetAllSubjects';
import AppLoader from '@/components/ui/AppLoader';

const ITEMS_PER_PAGE = 9;

const SubjectsGridPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useFetchAllSubjects(currentPage, ITEMS_PER_PAGE);

  const handleView = (slug: string) => {
    router.push(`/subjects/${slug}`);
  };

  if (isLoading) {
    return <AppLoader />;
  }

  if (error) {
    return <div>Error loading subjects: {error.message}</div>;
  }

  if (!data || !data.subjects) {
    return <div>No subjects found.</div>;
  }

  return (
    <section className="mx-16 mt-8">
      <h1 className="text-3xl font-bold mb-6">All Subjects</h1>
      {data.subjects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.subjects.map((subject: SubjectsResponse) => (
              <SubjectCard 
                key={subject.id} 
                subject={subject} 
                onView={() => handleView(subject.slug)} 
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <Button 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>Page {currentPage} of {data.totalPages}</span>
            <Button 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data.totalPages || 1))}
              disabled={currentPage === data.totalPages}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <div>No subjects available.</div>
      )}
    </section>
  );
};

export default withAuthLayout(SubjectsGridPage);


