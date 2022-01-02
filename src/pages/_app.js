import Script from "next/script";
import Head from "next/Head"
import {useState, useEffect } from "react";

import {
  ResetStyle,
  GlobalStyle,
  GlobalAntdStyle,
} from "../styles/globalStyles";

import LightTheme from "../styles/lightTheme";
import DarkTheme from "../styles/darkTheme";

import { ThemeProvider } from "styled-components";

import zhTW from "antd/lib/locale/zh_TW";
import { ConfigProvider } from "antd";
import "antd/dist/antd.css";

import lightVars from "../theme/light.json";
import darkVars from "../theme/dark.json";

//初始值
import StoreContext from "../components/Context/StoreContext";

import Header from "../components/Layout/Header";
import Main from "../components/Layout/Main";

function MyApp({ Component, pageProps }) {
  const [storeConfig, setStoreConfig] = useState({
    theme: "light",
  });

  //theme init
  useEffect(() => {
    window["less"] = {
      async: true,
      env: "production",
    };

    const css = document.createElement("link");
    css.href = "/color.less";
    css.rel = "stylesheet/less";
    css.type = "text/css";
    document.body.appendChild(css);


  }, []);

  return (
    <div className="App">
      <Head>
        <title>Wayne 隨手記</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Script
        src="/less.min.js"
        id="less-min-js"
        onLoad={() => {
          window["less"]
            .modifyVars(storeConfig.theme === "light" ? lightVars : darkVars)
            .catch((error) => {
              console.error("error", error);
            });
        }}
        onError={(e) => {
          console.error("less.min.js腳本加載失敗", e);
        }}
      />
      {/* 中文化配置 */}
      <ConfigProvider locale={zhTW}>
        {/* ResetStyle 要放在 GlobalStyle 之前 */}
        <ResetStyle />
        <StoreContext.Provider
          value={{ state: storeConfig, setState: setStoreConfig }}
        >
          <ThemeProvider
            theme={storeConfig.theme === "light" ? LightTheme : DarkTheme}
          >
            <GlobalStyle />
            <GlobalAntdStyle />
            <Header />
            <Main>
              <Component {...pageProps} />
            </Main>
          </ThemeProvider>
        </StoreContext.Provider>
      </ConfigProvider>
    </div>
  );
}

export default MyApp;
