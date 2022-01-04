import styled from "styled-components";

const ArticleEle = ({ className, article }) => {
  return <div className={className}></div>;
};

// 在 APP 被建構時調用
export async function getStaticPaths() {
  // 調用 API 獲取所有文章
  const call_articles = await fetch("http://localhost:3001/api/getArticles");

  const articles = await call_articles.json();

  // 需要事先渲染的路徑
  const paths = articles.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// 在构建时也会被调用
export async function getStaticProps({ params }) {
  // params 包含此片博文的 `id` 信息。
  // 如果路由是 /posts/1，那么 params.id 就是 1
  const call_articles = await fetch("http://localhost:3001/api/getArticles");
  console.log(params);
  const articles = await call_articles.json();

  // 通过 props 参数向页面传递博文的数据
  return { props: { articles } };
}
const Article = styled(ArticleEle)``;
export default Article;
