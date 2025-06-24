import React from "react";
import styled from "styled-components";
import DonationForm from "./DonationForm";


const CreateDonation = (props) => {
    return (
        <Container>
            <Content>
                <DonationForm />
            </Content>
        </Container>
    )
};

const Container = styled.div`
    max-width: 100%;
    padding: 20px 0;
    background: linear-gradient(#000, #fa8128, #fff);
`;

const Content = styled.div`
    margin: 0 auto;
    margin-top: 80px;
    background-color: white;
    border-radius: 30px;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.1);
    @media (min-width: 768px) {
        width: 60%;
    }
    @media (max-width: 530px) {
        width: 95%;
        margin-bottom: 10px;
        padding-top: 1px;
    }
`;


export default CreateDonation;