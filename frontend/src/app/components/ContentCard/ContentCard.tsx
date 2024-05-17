import React from 'react';
import styles from './ContentCard.module.css';

export type ContentCardProps = {
  content: {
    id: string;
    title: string;
    subTitle: string;
    body: string;
    author: string;
    imageUri: string;
    comments: {
      text: string;
      author: string;
      profilePic: string;
      likes: number;
    }[];
  };
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const { comments = [] } = content; // Default comments to an empty array if undefined

  return (
    <div className={styles["content-card"]} data-testid="content-card">
      <img src={content.imageUri} alt={`${content.title}`} className={styles["content-image"]} />
      <h2>{content.title}</h2>
      <h3>{content.subTitle}</h3>
      <p>{content.body}</p>
      <div className={styles["content-author"]}>Author: {content.author}</div>
      <div className={styles["content-comments"]}>
        {content.comments.map((comment, index) => (
          <div key={index} className={styles["comment"]}>
            <img src={comment.profilePic} alt={comment.author} className={styles["comment-profile-pic"]} />
            <div>
              <p className={styles["comment-author"]}>@{comment.author}</p>
              <p>{comment.text}</p>
              <p className={styles["comment-likes"]}>Likes: {comment.likes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCard;
