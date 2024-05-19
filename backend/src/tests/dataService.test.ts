import { processData } from '../services/dataService';

describe('processData', () => {
    it('should return the processed data', () => {
        // Arrange
        const data = {
            contentCards: [
                {
                    id: '1',
                    imageUri: 'https://example.com/image.jpg',
                    textData: {
                        title: 'Title',
                        subTitle: 'Subtitle',
                        body: 'Body',
                        author: {
                            first: 'John',
                            last: 'Doe'
                        }
                    },
                    metadata: {
                        priority: 1,
                        publishDate: '2022-01-01'
                    },
                    comments: [
                        {
                            text: 'Comment',
                            author: 'Commenter',
                            profilePic: 'https://example.com/profile.jpg',
                            likes: 10
                        }
                    ]
                }
            ]
        };

        // Act
        const result = processData(data);

        // Assert
        expect(result).toEqual([
            {
                id: '1',
                title: 'Title',
                subTitle: 'Subtitle',
                body: 'Body',
                author: 'John Doe',
                imageUri: 'https://example.com/image.jpg',
                priority: 1,
                comments: [
                    {
                        text: 'Comment',
                        author: 'Commenter',
                        profilePic: 'https://example.com/profile.jpg',
                        likes: 10
                    }
                ]
            }
        ]);
    });

    it('should sort data by priority in descending order', () => {
        // Arrange
        const data = {
            contentCards: [
                {
                    id: '1',
                    imageUri: 'https://example.com/image1.jpg',
                    textData: {
                        title: 'Title 1',
                        subTitle: 'Subtitle 1',
                        body: 'Body 1',
                        author: {
                            first: 'John',
                            last: 'Doe'
                        }
                    },
                    metadata: {
                        priority: 2,
                        publishDate: '2022-01-02'
                    },
                    comments: [
                        {
                            text: 'Comment 1',
                            author: 'Commenter 1',
                            profilePic: 'https://example.com/profile1.jpg',
                            likes: 20
                        }
                    ]
                },
                {
                    id: '2',
                    imageUri: 'https://example.com/image2.jpg',
                    textData: {
                        title: 'Title 2',
                        subTitle: 'Subtitle 2',
                        body: 'Body 2',
                        author: {
                            first: 'Jane',
                            last: 'Smith'
                        }
                    },
                    metadata: {
                        priority: 3,
                        publishDate: '2022-01-03'
                    },
                    comments: [
                        {
                            text: 'Comment 2',
                            author: 'Commenter 2',
                            profilePic: 'https://example.com/profile2.jpg',
                            likes: 30
                        }
                    ]
                },
                {
                    id: '3',
                    imageUri: 'https://example.com/image3.jpg',
                    textData: {
                        title: 'Title 3',
                        subTitle: 'Subtitle 3',
                        body: 'Body 3',
                        author: {
                            first: 'Alice',
                            last: 'Johnson'
                        }
                    },
                    metadata: {
                        priority: 1,
                        publishDate: '2022-01-01'
                    },
                    comments: [
                        {
                            text: 'Comment 3',
                            author: 'Commenter 3',
                            profilePic: 'https://example.com/profile3.jpg',
                            likes: 10
                        }
                    ]
                }
            ]
        };

        // Act
        const result = processData(data);

        // Assert
        expect(result.map(item => item.id)).toEqual(['2', '1', '3']); // Checking if the items are sorted by priority
    });

    it('should handle empty data', () => {
        // Arrange
        const data = { contentCards: [] };

        // Act
        const result = processData(data);

        // Assert
        expect(result).toEqual([]);
    });

    it('should handle missing properties in data', () => {
        // Arrange
        const data = {
            contentCards: [
                {
                    id: '1',
                    textData: {
                        title: 'Title',
                        subTitle: 'Subtitle',
                        body: 'Body',
                        author: {
                            first: 'John',
                            last: 'Doe'
                        }
                    },
                    comments: []
                }
            ]
        };

        // Act
        const result = processData(data);

        // Assert
        expect(result).toEqual([
            {
                id: '1',
                title: 'Title',
                subTitle: 'Subtitle',
                body: 'Body',
                author: 'John Doe',
                imageUri: undefined,
                priority: 0,
                comments: []
            }
        ]);
    });

    it('should handle null data', () => {
        // Arrange
        const data = null;

        // Act
        const result = () => processData(data);

        // Assert
        expect(result).toThrow(TypeError);
    });
});
