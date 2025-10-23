import React from 'react';
import styled from 'styled-components';

const CourseDetailContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;

const CourseDetailContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
`;

export default function CourseDetails() {
    return (
        <CourseDetailContainer>
            <CourseDetailContent>
                <PageTitle>Course Detail</PageTitle>
                <p>Course detail page content will be implemented here.</p>
            </CourseDetailContent>
        </CourseDetailContainer>
    );
};



