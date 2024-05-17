import React from "react";
import Header from "./components/Header/Header";
import ContentFeed, { Content } from "./components/ContentFeed/ContentFeed";
import axios from "axios";

async function fetchContentData(): Promise<Content[]> {
  const response = await axios.get('http://localhost:5000/api/content');
  return response.data;
}

const Home = async () => {
  let contentData: Content[] = [];
  let error: string | null = null;

  try {
    contentData = await fetchContentData();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch content';
  }

  return (
    <div>
      <Header />
      <ContentFeed contentData={contentData} error={error} />
    </div>
  );
};

export default Home;
