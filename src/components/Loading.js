import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Loading = ({ loading_message }) => {
  return (
    <Container>
      <Content>
        {loading_message ? (
          <LoadingMessage>{loading_message}</LoadingMessage>
        ) : (
          <img
            src="/images/icons/spinner.svg"
            className="spinner"
            alt="Loading..."
          />
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.4s ease-in-out;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 100px;
  min-height: 100px;

  padding: 20px;
  background-color: white;
  border-radius: 8px;

  img {
    display: block;
    width: 50px;
    height: 50px;
    pointer-events: none;
  }

  img.spinner {
    animation: load-spin 1s linear infinite;
  }

  @keyframes load-spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
`;

const mapStateToProps = (state) => ({
  loading: state.appState.loading,
  loading_message: state.appState.loading_message,
});

export default connect(mapStateToProps)(Loading);