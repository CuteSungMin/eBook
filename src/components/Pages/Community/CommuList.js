import React from "react";
import { Link } from "react-router-dom";
import CommuData from "./SubComponents/CommuData";
import "./CommuList.css";

const CommuList = () => {
  const { noticePosts } = CommuData();

 
  return (
    <section className="CommuSection">
      <div>
        <div>
          <div>커뮤니티</div>
          <div>초기화</div>
        </div>
        <ul className="CommuNav">
          <li><Link to='/community'>공지사항</Link></li>
          <li><Link to='/community/qna'>문의사항</Link></li>
          <li><Link to='/community/faq'>FAQ</Link></li>
        </ul>
      </div>

      <div className="CommuRight">
        <h1>공지사항</h1>
        <div className="CommuBoardHeader">
          <p className="CommuBoardNumber">번호</p>
          <p className="CommuBoardTitle">제목</p>
          <p className="CommuBoardDate">등록일</p>
        </div>


        <table className="CommuBoard">
          {noticePosts.postIndex.map((post) => (
            <Link to={`/community/notice/${post.id}`} key={post.id}>
              <tr>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.date}</td>
              </tr>
            </Link>
          ))}
        </table>

        <div className="CommuBottomWrap">
          <div></div>
          <div className="CommuPageButtonWrap">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
          </div>
          <Link to='/community/noticeWrite'>
            <div className="CommuWrite">글쓰기</div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommuList;
