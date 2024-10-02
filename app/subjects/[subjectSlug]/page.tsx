// "use client";

// import React, { useState } from "react";
// import { mockTopics, Topic } from "@/mocks/topics";
// import { useParams } from "next/navigation";
// import { Subject, mockSubjects } from "@/mocks/subject";
// import TopicsSidebar from "@/components/topic/TopicsSidebar";
// import TopicDetails from "@/components/topic/TopicDetails";
// import SubjectDetails from "@/components/subject/SubjectDetails";
// import { Button } from "@/components/ui/button"; // Assuming you have a Button component
// import Layout from "@/components/layout/Layout";

// const TopicsPage = () => {
//   const { subjectId } = useParams();

//   // Find the selected subject
//   const subject: Subject | undefined = mockSubjects.find(
//     (sub) => sub.id === subjectId
//   );

//   // Find topics related to the selected subject
//   const topics: Topic[] = mockTopics.filter(
//     (topic) => topic.subjectId === subjectId
//   );

//   // State to keep track of the selected topic, initialized as null or Topic
//   const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

//   const handleSelectTopic = (topicId: string) => {
//     const topic = topics.find((t) => t.id === topicId);
//     if (topic) {
//       setSelectedTopic(topic);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const handleBackToSubject = () => {
//     setSelectedTopic(null); // Set selected topic to null to return to subject details
//   };

//   if (!subject) {
//     return <p className="text-center mt-8">Subject not found.</p>;
//   }

//   return (
//     <Layout>
//     <section className="mx-16 mt-8 flex">
//       {/* Topics Sidebar */}
      
//       <TopicsSidebar
//         topics={topics}
//         selectedTopicId={selectedTopic?.id || null}
//         onSelectTopic={handleSelectTopic}
//       />

//       {/* Main Content: Subject Details or Topic Details */}
//       <div className="flex-1 ml-8">
//         {selectedTopic ? (
//           <>
//             {/* Back to Subject Details Button */}
//             <div className="mb-4">
//               <Button variant="outline" onClick={handleBackToSubject}>
//                 Back to Subject Details
//               </Button>
//             </div>

//             {/* Show Topic Details */}
//             <TopicDetails topic={selectedTopic} />
//           </>
//         ) : (
//           // Show Subject Details
//           <SubjectDetails subject={subject} />
//         )}
//       </div>
//     </section>
//     </Layout>
//   );
// };

// export default TopicsPage;

"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import TopicsSidebar from "@/components/topic/TopicsSidebar";
import TopicDetails from "@/components/topic/TopicDetails";
import SubjectDetails from "@/components/subject/SubjectDetails";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import AppLoader from "@/components/ui/AppLoader";
import { useAuth } from "@/contexts/Auth";
import { useFetchSingleSubject, Topic } from "@/hooks/subject/useGetSubjectBySlug";

const TopicsPage = () => {
  const { subjectSlug } = useParams();
  const { data: subject, isLoading, error } = useFetchSingleSubject(subjectSlug as string);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const { user } = useAuth();

  const handleSelectTopic = (topicId: string) => {
    const topic = subject?.topics.find((t) => t.id === topicId);
    if (topic) {
      setSelectedTopic(topic);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBackToSubject = () => {
    setSelectedTopic(null);
  };

  if (isLoading) {
    return <AppLoader />;
  }

  if (error || !subject) {
    return <p className="text-center mt-8">Subject not found or error loading data.</p>;
  }

  return (
    <Layout>
      <section className="mx-16 mt-8 flex">
        <TopicsSidebar
          topics={subject.topics}
          selectedTopicId={selectedTopic?.id || null}
          onSelectTopic={handleSelectTopic}
        />

        <div className="flex-1 ml-8">
          {selectedTopic ? (
            <>
              <div className="mb-4">
                <Button variant="outline" onClick={handleBackToSubject}>
                  Back to Subject Details
                </Button>
              </div>
              <TopicDetails topic={selectedTopic} user={user} />
            </>
          ) : (
            <SubjectDetails subject={subject} user={user} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default TopicsPage;