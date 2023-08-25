import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BookCard = (props) => {

  return (
    <Card>
      <Link to={`/books/${props.book.id}`}>
        <BackgroundImage
          style={{ backgroundImage: `url(${props.book.imageUrl})` }}
        />
      </Link>
      <BookActions>
        <BookStock>In stock (5)</BookStock>
        <RequestBook>Request</RequestBook>
      </BookActions>
    </Card>
  );
};

const Card = styled.div`
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: all 0.3s;
  border-radius: 10px;
  overflow: hidden;
  scroll-snap-align: center;
  background-color: #fff;
  margin: 0 auto;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  position: relative;

  &:hover {
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.4);
  }
`;

const BackgroundImage = styled.div`
  width: 100%;
  border-radius: 10px 10px 0 0;
  background-color: #333;
  background-position: center;
  background-size: cover;
  height: 300px;
`;

const BookActions = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  position: absolute;
  bottom: 0;
  flex-grow: 1;
  padding: 20px 5px;
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 767px) {
    font-size: 12px;
    padding: 10px;
  }
`;

const BookStock = styled.h1`
  margin-top: 1px;
  margin-bottom: 5px;
  font-weight: 600;
  text-align: left;
  overflow: hidden;
  font-size: 13px;
  width: fit-content;
`;

const RequestBook = styled.div`
  border: 1px solid #fff;
  width: fit-content;
  background-color: transparent;
  padding: 5px 10px;
  border-radius: 10px;
  margin-right: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    cursor: default;
    color: #000;
    background-color: #ff8c00;
    border: 1px solid #000;
  }
`;

export default BookCard;
