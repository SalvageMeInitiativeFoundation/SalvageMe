import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import LoadingSpinner from "../Shared/LoadingSpinner";
import EventForm from "./EventForm";
import TermsAndConditions from "./TermsAndConditions";

const CreateEvent = (props) => {
    const [slideDisplay, toggleSlideDisplay] = useState(["block", "none", "none"]);

    return (
        <Container>
            <Content>
                <EventForm />
            </Content>
        </Container>
    )
};

const Container = styled.div`
    max-width: 100%;
    margin-top: 50px;
    padding: 20px 0;
`;

const Content = styled.div`
    padding: 20px 0;
    box-shadow: 0 2px 2px 2px rgba(0,0,0,0.1);
    @media (min-width: 768px) {
        width: 60%;
        margin: 0 auto;
    }
    @media (max-width: 530px) {
        width: 100%;
        margin-bottom: 10px;
        padding-top: 1px;
        display: ${props => props.display};
    }
`;


export default CreateEvent;