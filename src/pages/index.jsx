import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ArticleCard from "../components/Article/ArticleCard";

const fadeIn = keyframes`
  from {
    visibility:"hidden";
    opacity: 0;
    margin-right:100rem;
  }

  to {
    visibility:"visible";
    opacity: 1;
    margin-right:0rem;
  }
`;

const Fade = styled.div`
  visibility:"hidden";
  opacity: 0;
  animation-delay: ${(props) => props.sec}s;
  animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-fill-mode:forwards;
`;

const HomeEle = ({ className, articles }) => {
  const [articleCards, setArticleCards] = useState([]);

  useEffect(() => {
    if (articles) {
      // (index+1)*0.5
      const articlesContainer = articles.map((item, index) => (
        <Fade out={false} sec={(index + 1) } key={item.name}>
          <ArticleCard article={item} />
        </Fade>
      ));
      setArticleCards(articlesContainer);
    }
  }, []);
  return <div className={className}>{articleCards}</div>;
};

export async function getStaticProps(context) {
  const call_articles = await fetch("http://localhost:3001/api/getArticles");

  const articles = await call_articles.json();

  return {
    props: { articles },
  };
}

const Home = styled(HomeEle)`
  position: relative;
`;

export default Home;
