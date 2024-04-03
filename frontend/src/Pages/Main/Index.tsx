import React from 'react';
import './index.css';

function Main() {
  return (
    <div className="mainContainer">
      <div className="newPostContainer">
        <NewPost />
      </div>
    </div>
  );
}

function NewPost() {
  const posts = [
    {
      id: 1,
      title: '첫번쨰 포스트',
      content: '이것은 첫번쨰 포스트',
      date: '2024-04-01',
      img: '/public/pictures/main/ex.jpeg',
    },
    {
      id: 2,
      title: '두번쨰 포스트',
      content: '이것은 두번쨰 포스트',
      date: '2024-04-02',
      img: '/public/pictures/main/ex.jpeg',
    },
    {
      id: 3,
      title: '세번쨰 포스트',
      content: '이것은 세번쨰 포스트',
      date: '2024-04-32',
      img: '/public/pictures/main/ex.jpeg',
    },
  ];
  return (
    <div>
      {posts.map((post) => (
        <div className="newPostBox" key={post.id}>
          <img src={post.img} alt="포스트이미지" />
          <div className="postWriteBox">
            <div className="postTitle">{post.title}</div>
            <div className="postContent">{post.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Main;
