/* external api response schema
 {
    id: string;
    imageUri: string;
    textData: {
      title: string;
      subTitle: string;
      body: string;
      author: {
        first: string;
        last: string;
      };
    };
    metadata: {
      priority: number;
      publishDate: string;  
    };
    comments: {
      text: string;
      author: string;
      profilePic: string;
      likes: number;
    }[];
  }
  */

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
  }

  export const processData = (data: any): Content[] => {
    return data.contentCards.map((item: any) => ({
      id: item.id,
      title: item.textData.title,
      subTitle: item.textData.subTitle,
      body: item.textData.body,
      author: `${item.textData.author.first} ${item.textData.author.last}`,
      imageUri: item.imageUri,
      priority: item.metadata?.priority || 0,
      comments: item.comments.map((comment: any) => ({
        text: comment.text,
        author: comment.author,
        profilePic: comment.profilePic,
        likes: comment.likes
      }))
    }))
    .sort((a: { priority: number; }, b: { priority: number; }) => b.priority - a.priority);
  };
  