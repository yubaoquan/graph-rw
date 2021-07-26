# 开发过程中用到的 graphQL 语句

```text
query Querys($getProfileUserId: String, $getCommentsArticleId: String) {
  # getProfile (userId: $getProfileUserId) {
  #   profile {
  #     bio
  #     following
  #     image
  #     username
  #   }
  # }

  # tags {
  #   title
  # }

  # currentUser {
  #   username
  # }

  # articles (offset: 2, limit: 2) {
  #   articles {
  #     title
  #     _id
  #     favoritesCount
  #     author {
  #       username
  #     }
  #   }
  # }

  # getArticleById (articleId: "60fe51ccf5cb5de7ea40f1c3") {
  #   article {
  #     _id
  #     title
  #     favoritesCount
  #   }
  # }
  # feed {
  #   articles {
  #     _id
  #     title
  #   }
  #   articlesCount
  # }
  getComments (articleId: $getCommentsArticleId) {
    comments {
      _id
      body
    }
  }
}

mutation Mutations(
  $followUserId: String,
  $updateFavoriteArticleId: String,
  $deleteCommentCommentId: String,
) {

  deleteComment(commentId: $deleteCommentCommentId) {
    success
    comment {
      _id
      body
    }
  }
  # createComment (
  #   comment: {
  #     articleId: "60fe430a5bb9f6d623a982b2",
  #     body: "55555感谢分享xxxxx"
  #   }
  # ) {
  #   comment {
  #     _id
  #     body
  #     author
  #     articleId
  #   }
  # }


  # updateFavorite (articleId: $updateFavoriteArticleId, op:"inc") {
  #   success
  # }

  # follow(userId: $followUserId) {
  #   success
  # }

  # unfollow(userId: $followUserId) {
  #   success
  # }
  # deleteArticle (articleId: $deleteArticleArticleId) {
  #   success
  # }
# createUser(
  #   user: {
  #     username: "xiaoming2",
  #     password: "123",
  #     email: "aaa1@1163.com",
  #   }
  # ) {
  #  user {
  #    username,
  #    email,
  #    bio,
  #    token,
  #  }
  # }

  # login(
  #   user: { email: "aaa@1163.com", password: "123" }
  # ) {
  #    user {
  #    username,
  #    email,
  #    bio,
  #    token,
  #  }
  # }

  # createArticle (
  #   article: {
  #     title: "44 world"
  #     body: "this is very boring"
  #     description: "boooo"
  #   }
  # ) {
  #   article {
  #     _id
  #     title
  #     body
  #   }
  # }

  # updateUser(user: { bio: "12345" }) {
  #   user {
  #     bio,
  #     username
  #   }
  # }

  # updateArticle(
  #   articleId: "60fe44555a5674d76ea0fc97",
  #   article: {
  #     title: "this is new article"
  #   }
  # ) {
  #   article {
  #     _id,
  #     title,
  #     body
  #   }
  # }
}


```
