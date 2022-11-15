const db = require("../db/connection");
const { convertTimestampToDate } = require("../db/seeds/utils");

exports.selectCategories = () => {
  return db
    .query(
      `
  SELECT * FROM categories;
    `,
    )
    .then((results) => {
      return results.rows;
    });
};

exports.selectReviews = () => {
  return db
    .query(
      `
      SELECT *, COUNT(review_id) AS comment_count FROM reviews group by review_id;
  `,
    )
    .then((results) => {
      return results.rows;
    });
};
