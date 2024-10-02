// 'use client';

// import React from 'react';
// import { Subject } from '@/mocks/subject';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Leaderboard from '../reusables/LeaderBoard';

// type SubjectDetailsProps = {
//   subject: Subject;
// };

// const SubjectDetails: React.FC<SubjectDetailsProps> = ({ subject }) => {
//   return (
//     <div>
//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">{subject.title}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-gray-700 mb-4">{subject.description}</p>
//         </CardContent>
//       </Card>

//       <Leaderboard type="subject" id={subject.id} />
//     </div>
//   );
// };

// export default SubjectDetails;


'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Leaderboard from '../reusables/LeaderBoard';
import { User } from '@/contexts/Auth';
import { RoleEnum } from '@/constants/type';
import { SubjectResponse } from '@/hooks/subject/useGetSubjectBySlug';

type SubjectDetailsProps = {
  subject: SubjectResponse;
  user: User | null;
};

const SubjectDetails: React.FC<SubjectDetailsProps> = ({ subject, user }) => {
  const showLeaderboard = user && (user.role === RoleEnum.ADMIN || user.role === RoleEnum.TEACHER);

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{subject.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{subject.description}</p>
        </CardContent>
      </Card>

      {showLeaderboard && (
        <Leaderboard type="subject" id={subject.slug} />
      )}
    </div>
  );
};

export default SubjectDetails;
