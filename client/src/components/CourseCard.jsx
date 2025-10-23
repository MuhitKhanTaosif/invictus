import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const CardContainer = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid transparent;
  position: relative;
  cursor: pointer;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-8px) rotateX(5deg) rotateY(5deg);
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.15),
      0 10px 10px -5px rgba(0, 0, 0, 0.1),
      0 0 0 1px #FFD70040;
    border-color: #FFD700;
  }

  &:active {
    transform: translateY(-4px) rotateX(2deg) rotateY(2deg);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #FFD70020 0%, #FFD70010 100%);
`;

const CourseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${CardContainer}:hover & {
    transform: scale(1.1);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    #FFD70040 0%,
    #FFD70020 50%,
    transparent 100%
  );
  transition: opacity 0.3s ease;

  ${CardContainer}:hover & {
    opacity: 0.8;
  }
`;

const ContentContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const CourseTitle = styled.h3`
  color: #333;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
  position: relative;

  ${CardContainer}:hover & {
    color: #FFD700;
  }
`;

const CourseCode = styled.div`
  color: #666;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
`;

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%);
  color: white;
  padding: 0.875rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px #FFD70040;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px #FFD70060;
    color: white;
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 1.1rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const CourseCard = ({ course }) => {
  return (
    <CardContainer>
      <ImageContainer>
        <CourseImage
          src={course.image}
          alt={course.title}
          loading="lazy"
        />
        <ImageOverlay />
      </ImageContainer>

      <ContentContainer>
        <CourseTitle>
          {course.title}
        </CourseTitle>

        <CourseCode>
          {course.code}
        </CourseCode>

        <ViewButton to={`/courses/${course.slug}`}>
          FIND OUT MORE
          <FiArrowRight />
        </ViewButton>
      </ContentContainer>
    </CardContainer>
  );
};

export default CourseCard;


