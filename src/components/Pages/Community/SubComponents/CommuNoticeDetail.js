import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { noticePost } from './CommuData';
import './CommuNoticeDetail.css';

const CommuNoticeDetail = () => {
  const { id } = useParams();
  const selectedPost = noticePost.postIndex.find((post) => post.id === parseInt(id));

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(() => {
    const storedContent = localStorage.getItem(`editedContent_${id}`);
    return storedContent !== null ? storedContent : selectedPost.content;
  });
  const [editedTitle, setEditedTitle] = useState(() => {
    const storedTitle = localStorage.getItem(`editedTitle_${id}`);
    return storedTitle !== null ? storedTitle : selectedPost.title;
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedContent(selectedPost.content);
    setEditedTitle(selectedPost.title);
    setIsEditing(false);
  };

  useEffect(() => {
    localStorage.setItem(`editedContent_${id}`, editedContent);
    localStorage.setItem(`editedTitle_${id}`, editedTitle);
  }, [id, editedContent, editedTitle]);

  return (
    <div className="CommuSection">
      <div>
        <div>
          <div>커뮤니티</div>
          <div>초기화</div>
        </div>
        <ul className="CommuNav">
          <li>
            <Link to="/community">공지사항</Link>
          </li>
          <li>
            <Link to="/community/qna">문의사항</Link>
          </li>
          <li>
            <Link to="/community/faq">FAQ</Link>
          </li>
        </ul>
      </div>

      <div className="CommuRight">
        <h1>공지사항</h1>

        {isEditing ? (
          <div>
            <input className="CommuQnaEditTitle"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </div>
        ) : (
          <div className="CommuQnaTitle">
            <div>{editedTitle}</div>
            <div></div>
            </div>
          
        )}

        {isEditing ? (
          <textarea
            className="CommuQnaEditText"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <div className="CommuQnaText">{editedContent}</div>
        )}

        {isEditing ? (

          <div>

            <div className="CommuQnaEditDetailButtonWrap">
              <button className="CommuQnaEditDetailButton" onClick={handleSaveClick}>저장</button>
              <button className="CommuQnaEditDetailButton" onClick={handleCancelClick}>취소</button>
            </div>
          </div>
        ) : (
          <div className="CommuNoticeDetailButtonWrap">
            <div></div>
            <Link to="/community"><button className="CommuNoticePageButton">목록보기</button></Link>
            <button className="CommuNoticeEditButton" onClick={handleEditClick}>글수정</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommuNoticeDetail;
