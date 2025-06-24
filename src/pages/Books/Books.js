import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { connect } from "react-redux";

import BookCard from "./BookCard";
import FilterButtons from "./Features/FilterButtons";
import Loading from "../../components/Loading";
import { books } from "../../assets/data";

const Books = (props) => {
  let { catId } = useParams();
  const [filteredEvents, setfilteredEvents] = useState();
  const [checkedInputs, setCheckInputs] = useState({cat: [], loc: [], date: []});

  const categories = [...new Set(books.map((book) => book.category))];

  const filterEvents = (checkedInputs) => {
    setCheckInputs(checkedInputs);
    const newFilteredEvents= books.filter((book) => {
      return  checkedInputs["cat"].includes(book.category);
    });
    setfilteredEvents(newFilteredEvents);
  };

  useEffect(() => {
    const filterEventsOnLoad = async () => { 
        if (catId) {
          filterEvents({...checkedInputs, cat: [...checkedInputs["cat"], catId]});
        }
        else {
          setfilteredEvents(books);
        }
      }; 
    filterEventsOnLoad();
  }, []);

  return (
    <Wrapper>
    { filteredEvents ? (
      <Container>
          {/* <Title>Events /</Title> */}
          <Section>
              <FlexWrap>
                <FilterButtons
                    filterEvents={filterEvents}
                    setfilteredEvents={setfilteredEvents}
                    categories={categories}
                    checkedInputs={checkedInputs}
                />
              </FlexWrap>
          </Section>  
          <FilteredBooks>
              {
                filteredEvents.map((book, key) => (
                  <FilteredItem>
                    <BookCard key={key} book={book} />
                  </FilteredItem>
                ))
              }
          </FilteredBooks>
      </Container>
      ) : (
        <Loading />
      )
    }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  margin: 0 auto;
  border-top: 1px solid white;
  @media (min-width: 481px) {
    width: 95%;
  }
  @media (min-width: 769px) {
    width: 85%;
  }
`;

const Section = styled.div`
  margin-top: 80px;
  margin-bottom: 20px;
  /* border: 1px solid blue; */
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  span {
    color: #36454F;
  }
`;

const FilteredBooks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px 10px;
  /* border: 1px solid black; */

  @media (min-width: 500px) {
    grid-auto-columns: calc(50% - 10px);
  }
  
  @media (min-width: 700px) {
    grid-auto-columns: calc(calc(100% / 3) - 20px);
    grid-gap: 30px 10px;
  }
  
  @media (min-width: 1100px) {
    grid-auto-columns: calc(25% - 30px);
  }
`;

const FilteredItem = styled.div`
  min-width: 250px;
  /* border: 1px solid black; */
`;

const mapStateToProps = (state) => {
    return {

    }
  };
  
const mapDispatchToProps = (dispatch) => ({
  
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(Books);
