import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommuData from './SubComponents/CommuData';

const CommuQna = () => {
  const { qnaPosts } = CommuData();
  const { page } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const originalPosts = qnaPosts.postIndex;
    const updatedPosts = originalPosts.map((post) => {
      const savedData = JSON.parse(localStorage.getItem(`editedQnaPost_${post.id}`));
      if (savedData) {
        return { ...post, title: savedData.editedQuestion };
      } else {
        return post;
      }
    });

    setFilteredPosts(updatedPosts);
  }, [qnaPosts.postIndex]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filtered = qnaPosts.postIndex.filter((post) =>
      post.title.includes(searchTerm)
    );

    setFilteredPosts(filtered);
  };


  const postsPerPage = 10;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPage = page ? parseInt(page) : 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const pageGroupSize = 5;
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(currentGroup * pageGroupSize, totalPages);

  const moveToPrevGroup = () => {
    const prevGroupFirstPage = startPage - pageGroupSize;
    const targetPage = Math.max(prevGroupFirstPage, 1);
    window.location.href = `/community/qna/${targetPage}`;
  };

  const moveToNextGroup = () => {
    const nextGroupFirstPage = startPage + pageGroupSize;
    const targetPage = Math.min(nextGroupFirstPage, totalPages);
    window.location.href = `/community/qna/${targetPage}`;
  };

  const moveToLastPage = () => {
    const lastPage = totalPages;
    window.location.href = `/community/qna/${lastPage}`;
  };

  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <Link to={`/community/qna/${i}`} key={i} className={i === currentPage ? "active" : ""}>
        <div>{i}</div>
      </Link>
    );
  }

  return (
    <div className="CommuSection">
      <div>
        <div>
          <div>커뮤니티</div>
          <div>초기화</div>
        </div>
        <ul className="CommuNav">
          <li>
            <Link to='/community'>공지사항</Link>
          </li>
          <li>
            <Link to='/community/qna'>문의사항</Link>
          </li>
          <li>
            <Link to='/community/faq'>FAQ</Link>
          </li>
        </ul>
      </div>

      <div className="CommuRight">
        <div className="CommuRightHeaderWrap">
          <h1>문의사항</h1>
          <input
            className="CommuRightSearch"
            type="text"
            placeholder="검색어를 입력해주세요."
            onChange={handleSearch}
          />
        </div>
        <div className="CommuBoardHeader">
          <p className="CommuBoardNumber">번호</p>
          <p className="CommuBoardTitle">제목</p>
          <p className="CommuBoardDate">등록일</p>
        </div>
        <table className="CommuBoard">
          {currentPosts.map((post) => (
            <Link to={`/community/qna/detail/${post.id}`} key={post.id}>
              {/* <tr>
                <td>{post.id}</td>
                <td className="CommuTitleWrap">
                  <p>{post.title}</p>
                  {post.answer ? null : <div>답변을 등록해주세요</div>}
                </td>
                <td>{post.date}</td>
              </tr> */}
              <tr>
                <td>{post.id}</td>
                <td className="CommuTitleWrap">
                  <p>{post.title}</p>
                  
                </td>
                <td>{post.date}</td>
              </tr>
            </Link>
          ))}
        </table>

        <div className="CommuBottomWrap">
          <div></div>

          <div className="CommuPageButtonWrap">
          <div className="CommuBottomPrevWrap">
            {currentGroup > 1 && (
              <Link to={`/community/qna/1`} className="CommuFirstPageButton">
                &lt;&lt;
              </Link>
            )}
            {currentGroup > 1 && (
              <div className="CommuPrevPageButton" onClick={moveToPrevGroup}>
                &lt;
              </div>
            )}
          </div>

              {pageButtons.slice(startPage - 1, endPage).map((button, index) => (
                <React.Fragment key={index}>{button}</React.Fragment>
              ))}

             <div className="CommuBottomNextWrap">
            {currentGroup < Math.ceil(totalPages / pageGroupSize) && (
              <div className="CommuNextPageButton" onClick={moveToNextGroup}>
                &gt;
              </div>
            )}
            {currentGroup * pageGroupSize < totalPages && (
              <div className="CommuLastPageButton" onClick={moveToLastPage}>
                &gt;&gt;
              </div>
            )}
          </div>
          </div>
          <Link to='/community/qnaWrite'>
            <div className="CommuWrite">글쓰기</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommuQna;






// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import CommuData from './SubComponents/CommuData';

// const CommuQna = () => {
//   const { qnaPosts } = CommuData();
//   const { page } = useParams();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const postsPerPage = 5;

//   useEffect(() => {
//     const originalPosts = qnaPosts.postIndex;
//     const updatedPosts = originalPosts.map((post) => {
//       const savedData = JSON.parse(localStorage.getItem(`editedQnaPost_${post.id}`));
//       if (savedData) {
//         return { ...post, title: savedData.editedQuestion };
//       } else {
//         return post;
//       }
//     });

//     setFilteredPosts(updatedPosts);
//   }, [qnaPosts.postIndex]);

//   const handleSearch = (e) => {
//     const searchTerm = e.target.value;
//     setSearchTerm(searchTerm);

//     const filtered = qnaPosts.postIndex.filter((post) =>
//       post.title.includes(searchTerm)
//     );

//     setFilteredPosts(filtered);
//   };

// // Pagination logic
// const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
// const currentPage = page ? parseInt(page) : 1;
// const startIndex = (currentPage - 1) * postsPerPage;
// const endIndex = startIndex + postsPerPage;
// const currentPosts = filteredPosts.slice(startIndex, endIndex);

//   // Generate page buttons
//   const pageButtons = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageButtons.push(
      
//         <Link to={`/community/qna/${i}`}><div key={i}>{i}</div></Link>

//     );
//   }


//   return (
//     <div className="CommuSection">
//       <div>
//         <div>
//           <div>커뮤니티</div>
//           <div>초기화</div>
//         </div>
//         <ul className="CommuNav">
//           <li>
//             <Link to='/community'>공지사항</Link>
//           </li>
//           <li>
//             <Link to='/community/qna'>문의사항</Link>
//           </li>
//           <li>
//             <Link to='/community/faq'>FAQ</Link>
//           </li>
//         </ul>
//       </div>

//        <div className="CommuRight">
//         <div className="CommuRightHeaderWrap">
//           <h1>문의사항</h1>
//           <input
//             className="CommuRightSearch"
//             type="text"
//             placeholder="검색어를 입력해주세요."
//             onChange={handleSearch}
//           />
//         </div>
//         <div className="CommuBoardHeader">
//           <p className="CommuBoardNumber">번호</p>
//           <p className="CommuBoardTitle">제목</p>
//           <p className="CommuBoardDate">등록일</p>
//         </div>
//         <table className="CommuBoard">
//           {currentPosts.map((post) => (
//             <Link to={`/community/qna/detail/${post.id}`} key={post.id}>
//               <tr>
//                 <td>{post.id}</td>
//                 <td>{post.title}</td>
//                 <td>{post.date}</td>
//               </tr>
//             </Link>
//           ))}
//         </table>
        
//         <div className="CommuBottomWrap">
//           <div></div>
//           <div className="CommuPageButtonWrap">
//             {pageButtons}
//           </div>
//           <Link to='/community/qnaWrite'>
//             <div className="CommuWrite">글쓰기</div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommuQna;