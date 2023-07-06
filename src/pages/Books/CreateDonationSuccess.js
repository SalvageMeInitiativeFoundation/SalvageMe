import React from "react";
import styled from "styled-components";


const CreateDonationSuccess = () => {
    return (
        <Container>
             <Section>
                <button className="close-popup">&times;</button>
                <img src="/images/icons/tick-circle.svg" />
                <p>
                    Your donation details have been successfully submited. 
                    SalvageMe review team would reach out to you via the email you provided
                    in less than 24hrs.
                </p>
            </Section>
        </Container>
    );
};

const Container = styled.div`
    padding: 0px;
    min-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Section = styled.section`
    width: 200px;
    height: fit-content;
    margin: 0 auto;
    padding: 10px;
    position: relative;
    color: green;
    border: 1px solid dodgerblue;
    border-radius: 5px;
    &>img {
        width: 50px;
    }
    &>button.close-popup {
        position: absolute;
        right: 0;
    }
`;


export default CreateDonationSuccess;