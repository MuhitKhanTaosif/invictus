import React from 'react';
import styled from 'styled-components';
import CourseCard from '../components/courses/CourseCard';

const Container = styled.div`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const courses = [
    {
        id: 1,
        title: 'Provide Cardiopulmonary Resuscitation',
        code: 'HLTAID009',
        slug: 'provide-cardiopulmonary-resuscitation',
        image: '/images/courses/cpr-training.jpg'
    },
    {
        id: 2,
        title: 'Provide Basic Emergency Life Support',
        code: 'HLTAID010',
        slug: 'provide-basic-emergency-life-support',
        image: '/images/courses/emergency-life-support.jpg'
    },
    {
        id: 3,
        title: 'Provide First Aid',
        code: 'HLTAID011',
        slug: 'provide-first-aid',
        image: '/images/courses/first-aid-basic.jpg'
    },
    {
        id: 4,
        title: 'Provide First Aid in an Education and Care Setting',
        code: 'HLTAID012',
        slug: 'provide-first-aid-education-care',
        image: '/images/courses/first-aid-education.jpg'
    },
    {
        id: 5,
        title: 'Provide First Aid in Remote or Isolated Area',
        code: 'HLTAID013',
        slug: 'provide-first-aid-remote',
        image: '/images/courses/first-aid-remote.jpg'
    },
    {
        id: 6,
        title: 'Provide Advanced First Aid',
        code: 'HLTAID014',
        slug: 'provide-advanced-first-aid',
        image: '/images/courses/advanced-first-aid.jpg'
    },
    {
        id: 7,
        title: 'Provide Advanced Resuscitation and Oxygen Therapy',
        code: 'HLTAID015',
        slug: 'provide-advanced-resuscitation-oxygen',
        image: '/images/courses/advanced-resuscitation.jpg'
    },
    {
        id: 8,
        title: 'Provide Pain Management',
        code: 'PUAEME008',
        slug: 'provide-pain-management',
        image: '/images/courses/pain-management.jpg'
    }
];

export default function FirstAidTraining() {
    return (
        <Container>
            <Title>First Aid, Resuscitation & CPR</Title>
            <Subtitle>
                Comprehensive first aid training courses designed to equip individuals with life-saving skills and emergency response knowledge.
                All courses are nationally recognized and meet Australian standards.
            </Subtitle>

            <CoursesGrid>
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                    />
                ))}
            </CoursesGrid>
        </Container>
    );
};



