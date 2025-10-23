import React from 'react';
import styled from 'styled-components';

const BlogDetailContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;

const BlogDetailContent = styled.div`
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

export default function ReadBlog() {
  return (
    <BlogDetailContainer>
      <BlogDetailContent>
        <PageTitle>Blog Detail</PageTitle>
        <p>Blog detail page content will be implemented here.</p>
      </BlogDetailContent>
    </BlogDetailContainer>
  );
};



