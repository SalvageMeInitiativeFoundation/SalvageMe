import React from "react";
import styled from "styled-components";


const TermsAndConditions = (props) => {
    return (
        <Container>
            <h4>Terms and Conditions</h4>
            <h6><b>Posting an Event</b></h6>
            <p>
              Posting any event on AyoEvents is <strong>FREE!</strong>.
              Ensure that details are credible and correct.
              We recommend that events are submitted at least 72 hours before 
              their due dates.
              Upon event submission, our special authorization team would do a background
              check to validate the credibitlity of the event.
              If the event is validated, it would be publish on the patform to allow for attendees
              to book seats or purchase tickets.
              However, an event that fails validation would be rejected.
            </p>

            <h6><b>Ticketing</b></h6>
            <p>If posted event is ticketed, AyoEvents takes a subsidized rate of 
                <b> 1%</b> for every ticket purchased.</p>
        </Container>
    )
}

const Container = styled.div`
  background-color: white;
  color: rgba(0, 0, 0, 0.6);
  padding: 10px;
  text-align: left;
  line-height: 1.5;

  h6 {
    color: #fa8128;
  }

  h4 {
    text-align: center;
    color: blue;
  }

  p {
    margin-bottom: 5px;
  }
`;

export default TermsAndConditions;