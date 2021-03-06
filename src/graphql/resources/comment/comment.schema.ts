const commentTypes = `

    # Comment definition type
    type Comment {
        id:ID!
        comment: String!
        createAt: String!
        updatedAt: String!
        user: User!
        post: Post!
    }

    input CommentInput {
        comment: String!
        user: Int!
        post: Int!
    }
`

const commentQueries = `
    commentsByPost(post: ID!, first: Int, offset:Int): [ Comment! ]!
`

const commentMutations = `
    createComment(input: CommentInput!): Comment    
    updateComment(id: ID!, input: CommentInput!): Comment
    deleteComment(id: ID!): Boolean
`

export {
    commentTypes,
    commentQueries,
    commentMutations,    
}