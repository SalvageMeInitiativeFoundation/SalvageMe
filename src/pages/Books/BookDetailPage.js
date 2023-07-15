import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { books } from "../../assets/data";

const BookDetailPage = (props) => {
  let { bookId } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    const getEvent = () => {
      let bk = books.find((obj) => obj.id === +bookId);
      setBook(bk);
    };
    getEvent();
  }, [bookId]);

  return (
    <BookDetailWrap>
      <Content>
        <Section>
          <Left>
            <Card>
              <BackgroundImage
                style={{ backgroundImage: `url(${book.imageUrl})` }}
              />
            </Card>
          </Left>
          <Right>
            <h3>{book.title}</h3>
            <p>
              <span>Level:</span> {book.level}
            </p>
            <p>
              <span>Author:</span> {book.author}
            </p>
            <p>
              <span>Category:</span> {book.category}
            </p>
            <p>
              <span>Description:</span> {book.description}
            </p>
            <BookActions>
              <BookStock>In stock (5)</BookStock>
              <RequestBook>Request</RequestBook>
            </BookActions>
          </Right>
        </Section>
      </Content>
    </BookDetailWrap>
  );
};

const BookDetailWrap = styled.div`
    max-width: 100%;
    padding: 20px 0;
    height:94vh;
    background: linear-gradient(#000, #fa8128, #eec141);
`;

const Content = styled.div`
    margin: 0 auto;
    margin-top: 80px;
    background-color: white;
    border-radius: 30px;
    /* box-shadow: 0 0 2px 0 rgba(0,0,0,0.1); */
    @media (min-width: 768px) {
        width: 60%;
    }
    @media (max-width: 530px) {
        width: 95%;
        margin-bottom: 10px;
        padding-top: 1px;
    }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 30px;
  padding: 30px;
  /* border: 1px solid red; */

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Left = styled.div`
  width: 40%;
  height: fit-content;
  /* border: 1px solid black; */
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Right = styled.div`
  width: 40%;
  height: fit-content;
  /* border: 1px solid black; */
  h3 {
    color: #000;
    border: 1px solid #f8f8f8;
    width: fit-content;
    padding: 3px 8px;
    border-radius: 10px;
    background-color: #f8f8f8;
  }
  p span {
    color: #ff8c00
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Card = styled.div`
  width: 250px;
  height: 300px;
  transition: all 0.3s;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2);
  margin: 0 auto;
`;

const BackgroundImage = styled.div`
  width: 100%;
  border-radius: 10px 10px 0 0;
  background-position: center;
  background-size: cover;
  height: 300px;
`;

const BookActions = styled.div`
  /* background-color: rgba(0, 0, 0, 0.7); */
  color: #ff8c00;
  padding: 20px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BookStock = styled.h4`
  margin-top: 1px;
  margin-bottom: 5px;
  font-weight: 600;
  text-align: left;
  overflow: hidden;
  width: fit-content;
`;

const RequestBook = styled.div`
  border: 1px solid #ff8c00;
  width: fit-content;
  background-color: transparent;
  padding: 5px 10px;
  border-radius: 10px;
  margin-right: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    cursor: default;
    background-color: #ff8c00;
    color: #fff;
  }
`;
export default BookDetailPage;
