"use client"
import React, { useState } from 'react';
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

const contentBodyMaxLength = 170;

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const { comments = [] } = content; // Default comments to an empty array if undefined
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedBody = content.body.length > contentBodyMaxLength ? content.body.substring(0, contentBodyMaxLength) + '...' : content.body;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles["content-card"]} data-testid="content-card">
      <img src={content.imageUri} alt={`${content.title}`} className={styles["content-image"]} />
      <div className={styles["content-details"]}>
        <div className={styles["content-header"]}>
          <h2 className={styles["content-title"]}>{content.title}</h2>
          <p className={styles["content-author"]}>Author: {content.author}</p>
        </div>
        <h3 className={styles["content-subtitle"]}>{content.subTitle}</h3>
        <p className={styles["content-body"]}>
          {isExpanded ? content.body : truncatedBody}
        </p>
        {content.body.length > 300 && (
          <button onClick={toggleExpanded} className={styles["read-more-btn"]}>
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
        <div className={styles["content-comments"]}>
          {comments.map((comment, index) => (
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
    </div>
  );
};

export default ContentCard;
