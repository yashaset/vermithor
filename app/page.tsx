"use client";
import React from "react";
import { BLUE, ORANGE, VOILET } from "./colors";
import styled from "styled-components";
const HomePage = () => {
  return (
    <div
      style={{
        background: BLUE[100],
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <ProfileCardContainer>
          <ProfileContainer />
          <TitleContainer>
            <h1
              style={{
                color: ORANGE[100],
                fontWeight: 800,
                fontFamily: "var(--font-raleway)",
                fontSize: "2.5rem",
              }}
            >
              Yash Rawat
            </h1>
            <h2
              style={{
                fontSize: "1.2rem",
              }}
            >
              UI Developer | React | NextJS
            </h2>
          </TitleContainer>
          <InfoTileContainer>
            <Tile>
              <h3
                style={{
                  fontWeight: "100",
                  fontSize: "1.8rem",
                }}
              >
                Phone
              </h3>
              <h4
                style={{
                  fontWeight: "100",
                  fontSize: "1.8rem",
                  color: ORANGE[100],
                }}
              >
                +91 9953631349
              </h4>
            </Tile>
            <Tile>
              <h3
                style={{
                  fontWeight: "100",
                  fontSize: "1.8rem",
                }}
              >
                Email
              </h3>
              <h4
                style={{
                  fontWeight: "100",
                  fontSize: "1.8rem",
                  color: ORANGE[100],
                }}
              >
                rawatyash1999@gmail.com
              </h4>
            </Tile>
            <Tile>
              <h3
                style={{
                  fontWeight: "100",
                  fontSize: "1.8rem",
                }}
              >
                Location
              </h3>
              <h4
                style={{
                  fontWeight: "100",
                  fontSize: "1.8rem",
                  color: ORANGE[100],
                }}
              >
                New Delhi, IN
              </h4>
            </Tile>
          </InfoTileContainer>
        </ProfileCardContainer>
      </div>
    </div>
  );
};

export default HomePage;

const ProfileCardContainer = styled.div`
  background: ${VOILET[100]};
  padding: 16px;
  padding-top: 160px;
  border-radius: 20px;
  font-family: var(--font-raleway);
  position: relative;
  margin-top: 100px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 32px 32px;
`;

const InfoTileContainer = styled.div`
  background-color: ${VOILET[200]};
  padding: 24px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;
const Tile = styled.div`
  padding: 14px 20px;
  background-color: ${VOILET[100]};
  border-radius: 20px;
  width: 100%;
`;

const ProfileContainer = styled.div`
  width: 250px;
  height: 250px;
  left: 50%;
  top: 3%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  position: absolute;
  background-color: #d9d9d9;
`;
