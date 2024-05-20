export type Content = {
  id: string;
  title: string;
  subTitle: string;
  body: string;
  author: string;
  imageUri: string;
  priority: number;
  comments: {
    text: string;
    author: string;
    profilePic: string;
    likes: number;
  }[];
};

export const processData = (data: any): Content[] => {
  if (!data || !Array.isArray(data.contentCards)) {
    throw new TypeError("Invalid data format");
  }

  return data.contentCards
    .filter((item: any) => 
      item.id &&
      item.imageUri &&
      item.textData &&
      item.textData.title &&
      item.textData.subTitle &&
      item.textData.body &&
      item.textData.author &&
      item.textData.author.first &&
      item.textData.author.last &&
      item.metadata &&
      item.metadata.priority !== undefined &&
      item.metadata.publishDate &&
      Array.isArray(item.comments) &&
      item.comments.every((comment: any) =>
        comment.text && comment.author && comment.profilePic && comment.likes !== undefined
      )
    )
    .map((item: any) => ({
      id: item.id,
      title: item.textData.title,
      subTitle: item.textData.subTitle,
      body: item.textData.body,
      author: `${item.textData.author.first} ${item.textData.author.last}`,
      imageUri: item.imageUri,
      priority: item.metadata.priority,
      comments: item.comments.map((comment: any) => ({
        text: comment.text,
        author: comment.author,
        profilePic: comment.profilePic,
        likes: comment.likes
      }))
    }))
    .sort((a: { priority: number; }, b: { priority: number; }) => b.priority - a.priority);
};

/*
  Decision:
  The processData function filters out malformed data to ensure that only well-formed content cards
  are processed and displayed. This decision was made to maintain data integrity and avoid potential 
  issues with missing or incomplete data. However, this approach could be modified to use default 
  values for missing properties instead of filtering out malformed data. For example, default values 
  could be assigned to properties like imageUri, priority, etc., if they are missing. This would 
  allow all data to be processed, even if some properties are missing, but might require additional 
  handling logic to ensure the application behaves as expected.
*/
