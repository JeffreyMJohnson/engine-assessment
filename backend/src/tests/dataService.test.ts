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
