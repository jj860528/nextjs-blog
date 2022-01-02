import { useEffect, useContext } from "react";
import styled from "styled-components";

import darkVars from "../theme/dark.json";
import lightVars from "../theme/light.json";

import StoreContext from "./Context/StoreContext";

import { MoonFill, SunFill } from "@styled-icons/bootstrap";

import { Tooltip } from "antd";

const ThemeButton = ({ className }) => {
  const configContext = useContext(StoreContext);

  const { state, setState } = configContext;

  useEffect(() => {
    if (!window.less) {
      return;
    }
    switch (state.theme) {
      case "light":
        window.less.modifyVars(lightVars).catch((error) => {
          console.error("error", error);
        });
        break;
      case "dark":
        window.less.modifyVars(darkVars).catch((error) => {
          console.error("error", error);
        });
        break;
      default:
        console.log("ThemeButton 主題尚未加載");
    }
  }, [state]);

  const SunFillIcon = styled(SunFill)`
    cursor: pointer;
    color: #ebcf74;
  `;

  const MoonFillIcon = styled(MoonFill)`
    cursor: pointer;
    color: #474950;
  `;

  return (
    <div>
      {state.theme === "light" ? (
        <Tooltip title="切換為夜間模式">
          <SunFillIcon
            size={35}
            onClick={() => setState({ ...state, theme: "dark" })}
          />
        </Tooltip>
      ) : (
        <Tooltip title="切換為日間模式">
          <MoonFillIcon
            size={35}
            onClick={() => setState({ ...state, theme: "light" })}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default ThemeButton;
