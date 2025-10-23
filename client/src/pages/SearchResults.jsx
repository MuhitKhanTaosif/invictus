import React from 'react';
import styled from 'styled-components';

const SearchResultsContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;

const SearchResultsContent = styled.div`
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

export default function SearchResults() {
    return (
        <SearchResultsContainer>
            <SearchResultsContent>
                <PageTitle>Search Results</PageTitle>
                <p>Search results page content will be implemented here.</p>
            </SearchResultsContent>
        </SearchResultsContainer>
    );
};




