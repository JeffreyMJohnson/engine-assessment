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

  interface Content{
    id: string;
    title: string;
    subTitle: string;
    body: string;
  }

export const processData = (data: any) => {
    return data.contentCards.map((item: any) => ({
      id: item.id,
      title: item.textData.title,
      subTitle: item.textData.subTitle,
      body: item.textData.body
    }));
  };
  