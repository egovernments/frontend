import React, { useEffect, useState } from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { Dropdown } from "@egovernments/digit-ui-react-components";
import { useLocation } from "react-router-dom";

const Digit = window.Digit;

const SelectChannel = ({ t, config, onSelect, formData = {}, userType }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const isSwachSathiEmployee =
    Digit.UserService.hasAccess("FSM_SWACHH_SATHI") || false;

  const { pathname: url } = useLocation();
  const editScreen = url.includes("/modify-application/");

  const { data: channelMenu } = Digit.Hooks.fsm.useMDMS(
    tenantId,
    "FSM",
    "EmployeeApplicationChannel"
  );
  const [channel, setChannel] = useState(formData?.channel);

  useEffect(() => {
    if (channelMenu && isSwachSathiEmployee) {
      setChannel(channelMenu?.find((i) => i.code === "SWACHHSATHI"));
      onSelect(
        config.key,
        channelMenu?.find((i) => i.code === "SWACHHSATHI")
      );
    }
  }, [channelMenu]);

  function selectChannel(value) {
    setChannel(value);
    onSelect(config.key, value);
  }

  return channelMenu ? (
    <Dropdown
      option={
        !isSwachSathiEmployee
          ? channelMenu
              .filter((i) => i.code !== "SWACHHSATHI")
              ?.sort((a, b) => a.name.localeCompare(b.name))
          : channelMenu?.sort((a, b) => a.name.localeCompare(b.name))
      }
      optionKey="i18nKey"
      id="channel"
      selected={channel}
      select={selectChannel}
      t={t}
      disable={editScreen || isSwachSathiEmployee}
      autoFocus={!editScreen}
    />
  ) : (
    <Loader />
  );
};

export default SelectChannel;
