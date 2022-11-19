const db = require("../db/connection");
const {
  convertTimestampToDate,
  doesReviewExist,
  doesUsernameExist,
} = require("../db/seeds/utils");

exports.insertComment = async (id, data) => {
  const { body, username } = data;
  await doesReviewExist(id);

  await doesUsernameExist(username);

  const result = await db.query(
    `INSERT INTO comments (body, author, review_id) VALUES ($1,$2,$3) RETURNING *;`,
    [body, username, id],
  );

  return result.rows[0];
};
