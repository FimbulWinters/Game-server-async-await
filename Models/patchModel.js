const db = require("../db/connection.js");
const { doesReviewExist } = require("../db/seeds/utils.js");

exports.updateVotes = async (id, voteAction) => {
  await doesReviewExist(id);

  const res = await db.query(`SELECT votes FROM reviews WHERE review_id = $1`, [
    id,
  ]);

  const currentVotes = res.rows[0].votes;
  const newVotes = currentVotes + voteAction.inc_votes;
  const result = await db.query(
    `UPDATE reviews SET votes = $1 WHERE review_id = $2 RETURNING *`,
    [newVotes, id],
  );

  return result.rows[0];
};
