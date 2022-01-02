import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import {
  HomeOutlined,
  TagsOutlined,
  ReconciliationOutlined,
  UserOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

import ThemeButton from "../ThemeButton";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const Fade = styled.div`
  display: inline-block;
  visibility: ${(props) => (props.out ? "hidden" : "visible")};
  animation: ${(props) => (props.out ? fadeOut : fadeIn)} 1s linear;
  transition: visibility 1s linear;
`;

const HeaderEle = ({ className }) => {
  const router = useRouter();

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  }, []);

  return (
    <div className={className}>
      <Fade out={visible}>
        <div className="header-container">
          <ul>
            <li>
              <Link href="/">
                <a className={router.route === "/" ? "selected" : ""}>
                  <HomeOutlined />
                  首頁
                </a>
              </Link>
            </li>
            <li>
              <Link href="/tag">
                <a className={router.route === "/tag" ? "selected" : ""}>
                  <TagsOutlined />
                  標籤
                </a>
              </Link>
            </li>
            <li>
              <Link href="/record">
                <a className={router.route === "/record" ? "selected" : ""}>
                  <ReconciliationOutlined />
                  紀錄
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className={router.route === "/about" ? "selected" : ""}>
                  <UserOutlined />
                  關於
                </a>
              </Link>
            </li>
            <li>
              <Link href="/demo">
                <a className={router.route === "/demo" ? "selected" : ""}>
                  <ProfileOutlined />
                  演示
                </a>
              </Link>
            </li>
          </ul>
          <ThemeButton className="theme-button" />
        </div>
      </Fade>
    </div>
  );
};

const Header = styled(HeaderEle)`
  height: 120px;
  line-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #8585857f;
  position: relative;
  .header-container {
    position: relative;
    max-width: 1200px;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }
  .theme-button {
  }
  ul {
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  ul li {
    list-style: none;
    margin: auto 45px;
  }
  ul li a {
    color: inherit; /* 移除超連結顏色 */
    text-decoration: none; /* 移除超連結底線 */
    font-size: 2rem;
    position: relative;
  }
  ul li span {
    font-size: 2rem;
    margin-right: 5px;
  }
  a:hover {
    color: ${({ theme }) => theme.color["@primary-color"]};
  }

  a:after {
    content: "";
    position: absolute;
    left: 50%;
    right: 50%;
    bottom: -5px;
    height: 0;
    border-bottom: 3px solid ${({ theme }) => theme.color["@primary-color"]};
    transition: 0.3s;
    font-size: 3px;
  }
  a:hover:after {
    left: 0;
    right: 0;
  }

  .selected {
    color: ${({ theme }) => theme.color["@primary-color"]};
  }
`;

export default Header;
