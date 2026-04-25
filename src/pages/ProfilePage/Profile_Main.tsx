import React, { useEffect, useState } from "react";
import { HiUser, HiCollection, HiMail, HiLink, HiBadgeCheck, HiCalendar, HiPencil } from "react-icons/hi";
import { Link } from "react-router-dom";
import * as S from "./Profile_Main_style";
import ProfileApi from "../../lib/apis/ProfileApi";
import HandleResponseApi from "../../lib/HandleResponse";
import RoutesEnum from "../../lib/RoutesEnum";
import { AccountDto, Profile } from "../../utils/type";

const Profile_Main = () => {
  const [img, setImage] = useState<string>();
  const [profile, setProfile] = useState<AccountDto>();

  const handleResponse = HandleResponseApi.useHandleResponse();

  const handleProfile = (profile: AccountDto) => {
    setProfile(profile);
    const base64Image = "data:image/png;base64," + profile.profileImage;
    setImage(base64Image);
  };

  useEffect(() => {
    const getProfile = async () => {
      const response = await ProfileApi.fetchMyProfile();
      console.log("profile=> ", response);
      handleResponse(response, handleProfile, { path: "", dialog: "" });
    };
    getProfile();
  }, []);

  return (
    <S.Container>
      <S.Sidebar>
        <Link to={RoutesEnum.PROFILE} style={{ textDecoration: 'none' }}>
          <S.NavItem active={true}>
            <HiUser size={24} />
            My Profile
          </S.NavItem>
        </Link>
        <Link to={RoutesEnum.MY_STUDY_LIST} style={{ textDecoration: 'none' }}>
          <S.NavItem>
            <HiCollection size={24} />
            My Studies
          </S.NavItem>
        </Link>
      </S.Sidebar>

      <S.ProfileCard>
        <S.ProfilePicture>
          <img src={img || "https://via.placeholder.com/150"} alt="Profile" />
        </S.ProfilePicture>
        
        <S.ProfileName>{profile?.nickname || "Unknown User"}</S.ProfileName>
        <S.ProfileBio>{profile?.bio || "No bio provided."}</S.ProfileBio>

        <S.InfoGrid>
          <S.InfoItem>
            <div className="icon">
              <HiMail size={24} />
            </div>
            <div className="details">
              <span className="label">Email</span>
              <span className="value">{profile?.email || "Not provided"}</span>
            </div>
          </S.InfoItem>

          <S.InfoItem>
            <div className="icon">
              <HiLink size={24} />
            </div>
            <div className="details">
              <span className="label">Website / URL</span>
              {profile?.url ? (
                <a className="value" href={profile.url} target="_blank" rel="noopener noreferrer">
                  {profile.url}
                </a>
              ) : (
                <span className="value">Not provided</span>
              )}
            </div>
          </S.InfoItem>

          <S.InfoItem>
            <div className="icon">
              <HiBadgeCheck size={24} />
            </div>
            <div className="details">
              <span className="label">Email Verification</span>
              <span className="value">{profile?.emailVerified ? "Verified" : "Pending Verification"}</span>
            </div>
          </S.InfoItem>
          
        </S.InfoGrid>

        <S.EditButton>
          <Link to={RoutesEnum.PROFILE_SETTING}>
            <HiPencil size={20} /> Edit Profile
          </Link>
        </S.EditButton>
      </S.ProfileCard>
    </S.Container>
  );
};

export default Profile_Main;
