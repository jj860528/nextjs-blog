import styled from "styled-components";
import moment from "moment";

const ArticleCardEle = ({ className, article }) => {
  console.log(article);

  return (
    <div className={className}>
      <div className="card-header">
        <div className="card-title">
          <a>{article.name}</a>
        </div>
        <div className="card-tag">
          <p>標籤：{article.type}</p>
        </div>
        <div className="card-time">
          <p>時間：{article.date}</p>
        </div>
      </div>
      <div className="card-body">
        <p> {article.introduction}</p>
      </div>
    </div>
  );
};

const ArticleCard = styled(ArticleCardEle)`
  width: 100%;
  border: 1px solid #dcdfe6;
  margin: 3rem 0rem 0rem 0rem;
  border-radius: 5px;
	letter-spacing: 0.3rem;
   /* background-color: rgba(0, 0, 0, .25); */
   backdrop-filter: invert(10%);
  .card-header {
    margin: 1.6rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 1.6rem;
  }
  .card-title {
    color: ${({ theme }) => theme.color["@primary-color"]};
    font-size: 1.8rem;
    font-weight: 800;
  }
  .card-tag {
    font-size: 1.6rem;
    color: #969696;
  }
  .card-time {
    font-size: 1.6rem;
    color: #969696;
  }
  .card-body {
    margin: 2rem 1.6rem;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #797979;
  }
`;
export default ArticleCard;
