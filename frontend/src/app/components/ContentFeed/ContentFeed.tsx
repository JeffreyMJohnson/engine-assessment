'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContentCard from '../ContentCard/ContentCard';
import styles from '@/app/components/ContentFeed/ContentFeed.module.css';


interface Content {
  id: string;
  title: string;
  subTitle: string;
  body: string;
}

const ContentFeed: React.FC = () => {
  const [contentData, setContentData]  = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/content');
        setContentData(response.data);
      } catch (error) {
        setError('Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if(error) return <div>{error}</div>;

  return (
    <div className={styles["content-feed"]}>
      {contentData.map((content) => (
        <ContentCard key={content.id} content={content} />
      ))}
    </div>
  );
};

export default ContentFeed;
