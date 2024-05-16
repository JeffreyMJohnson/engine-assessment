'use client'

import React from 'react';
import styles from './ContentCard.module.css';

interface ContentCardProps {
  content: {
    id: string;
    title: string;
    subTitle: string;
    body: string;
  };
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  return (
    <div className={styles["content-card"]} data-testid={"content-card" + content.id}>
      <h2>{content.title}</h2>
      <h3>{content.subTitle}</h3>
      <p>{content.body}</p>
    </div>
  );
};

export default ContentCard;
