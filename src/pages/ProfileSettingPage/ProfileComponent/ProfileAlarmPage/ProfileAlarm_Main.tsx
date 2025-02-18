import React, { useState } from "react";
import ToggleButton from "../../../../components/ToogleSwitch/ToggleSwitch";
import * as S from "./ProfileAlarm_Main_style";

const ProfileAlarm_Main = () => {
  const [tagAndZoneWeb, setTagAndZoneWeb] = useState(true);
  const [tagAndZoneEmail, setTagAndZoneEmail] = useState(false);
  const [joinWeb, setJoinWeb] = useState(true);
  const [joinEmail, setJoinEmail] = useState(false);
  const [alreadyJoinWeb, setAlreadyJoinWeb] = useState(true);
  const [alreadyJoinEmail, setAlreadyJoinEmail] = useState(false);

  const handleToggle = (
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setState(!state);
  };

  return (
    <S.Profile_Alarm_Container_style>
      <S.Profile_Alarm_Description_style>
        Set up notifications when studies on topics(tag) of interest to you are
        created in your main activity area(zone).
      </S.Profile_Alarm_Description_style>
      <S.Profile_Alarm_Item_style>
        <ToggleButton
          isOn={tagAndZoneWeb}
          handleToggle={() => handleToggle(tagAndZoneWeb, setTagAndZoneWeb)}
        >
          Via Web
        </ToggleButton>
        <ToggleButton
          isOn={tagAndZoneEmail}
          handleToggle={() => handleToggle(tagAndZoneEmail, setTagAndZoneEmail)}
        >
          Via Email
        </ToggleButton>
      </S.Profile_Alarm_Item_style>

      <S.Profile_Alarm_Description_style>
        Set how you want to be notified of the results of your application to
        join a study group.
      </S.Profile_Alarm_Description_style>
      <S.Profile_Alarm_Item_style>
        <ToggleButton
          isOn={joinWeb}
          handleToggle={() => handleToggle(joinWeb, setJoinWeb)}
        >
          Via Web
        </ToggleButton>
        <ToggleButton
          isOn={joinEmail}
          handleToggle={() => handleToggle(joinEmail, setJoinEmail)}
        >
          Via Email
        </ToggleButton>
      </S.Profile_Alarm_Item_style>

      <S.Profile_Alarm_Description_style>
        Set how you want to be notified about studies you're participating in.
      </S.Profile_Alarm_Description_style>
      <S.Profile_Alarm_Item_style>
        <ToggleButton
          isOn={alreadyJoinWeb}
          handleToggle={() => handleToggle(alreadyJoinWeb, setAlreadyJoinWeb)}
        >
          Via Web
        </ToggleButton>
        <ToggleButton
          isOn={alreadyJoinEmail}
          handleToggle={() =>
            handleToggle(alreadyJoinEmail, setAlreadyJoinEmail)
          }
        >
          Via Email
        </ToggleButton>
      </S.Profile_Alarm_Item_style>
    </S.Profile_Alarm_Container_style>
  );
};

export default ProfileAlarm_Main;
