const typeDefs = `
schema {
    query: Query
}
type Query {
    books(orderBy: BooksOrderBy = RATING_DESC): [Book]
    reviews(orderBy: ReviewsOrderBy = ID_DESC): [Review]
}
type Review {
    id: ID!
    rating: Int
    title: String
    comment: String
    book: Book
    user: User
}
type Book {
    id: ID!
    title: String!
    description: String!
    imageUrl(size: ImageSize = LARGE): String!
    rating: Float
    subtitle: String
    ratingCount: Int
    authors: [Author]
}
type User {
    id: ID!
    name: String
}
type Author {
    id: ID!
    name: String
}
enum ImageSize {
    SMALL
    LARGE
}
enum BooksOrderBy {
    RATING_DESC
    ID_DESC
}
enum ReviewsOrderBy {
    ID_ASC
    ID_DESC
}
`;

module.exports = typeDefs;