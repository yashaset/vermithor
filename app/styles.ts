import styled from "styled-components";
import { VOILET } from "./colors";

export const ProfileCardContainer = styled.div`
  background: ${VOILET[100]};
  padding: 16px;
  padding-top: 160px;
  border-radius: 20px;
  font-family: var(--font-raleway);
  position: relative;
  margin-top: 100px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 32px 32px;
`;

export const InfoTileContainer = styled.div`
  background-color: ${VOILET[200]};
  padding: 24px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;
export const Tile = styled.div`
  padding: 14px 20px;
  background-color: ${VOILET[100]};
  border-radius: 20px;
  width: 100%;
`;

export const ProfileContainer = styled.div`
  width: 250px;
  height: 250px;
  left: 50%;
  top: 3%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  position: absolute;
  background-color: #d9d9d9;
`;
