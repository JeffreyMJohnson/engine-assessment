import React from 'react';

import styles from './ContentFeed.module.css';
import ContentCard from '../ContentCard/ContentCard';

export type Content = {
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

export type ContentFeedProps = {
  contentData: Content[];
  error?: string | null;
};

const ContentFeed: React.FC<ContentFeedProps> = ({ contentData = [], error }) => {
  if (error) return <div>{error}</div>;

  return (
    <div className={styles["content-feed"]}>
      {contentData.map((content) => (
        <ContentCard key={content.id} content={content} />
      ))}
    </div>
  );
};

export default ContentFeed;
