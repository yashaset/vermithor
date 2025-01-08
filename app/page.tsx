"use client";
import React from "react";
import { BLUE, ORANGE, VOILET } from "./colors";
import YouTubeEmbed from "./UI/YouTubeEmbed/YouTubeEmbed";
import {
  InfoTileContainer,
  ProfileCardContainer,
  ProfileContainer,
  Tile,
  TitleContainer,
} from "./styles";
import ShowCaseVideos from "./UI/ShowCaseVideos/ShowCaseVideos";
import Link from "next/link";
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
              <Link
                href={"mailto: yash@yashrawat.com"}
                style={{
                  fontWeight: "100",
                  fontSize: "1.8rem",
                  color: ORANGE[100],
                  textDecoration: "none",
                }}
              >
                yash@yashrawat.com
              </Link>
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
      <div
        id="youtube-videos"
        style={{
          padding: 16,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-raleway)",
          }}
        >
          Check out my latest videos!
        </h2>
        <ShowCaseVideos />
      </div>
    </div>
  );
};

export default HomePage;
