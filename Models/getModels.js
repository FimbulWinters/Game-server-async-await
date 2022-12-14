const db = require("../db/connection");
const {
  convertTimestampToDate,
  doesReviewExist,
  doesCategoryExist,
} = require("../db/seeds/utils");

const { readFile } = require("fs/promises");

exports.getAPIInfo = async () => {
  const contents = await readFile("./endpoints.json", "utf-8");
  return JSON.parse(contents);
};

exports.selectCategories = async () => {
  const results = await db.query(
    `
  SELECT * FROM categories;
    `,
  );

  return results.rows;
};

exports.selectReviews = async (
  categories,
  sortBy = "created_at",
  order = "DESC",
) => {
  await doesCategoryExist(categories);

  const sortAllowed = [
    "owner",
    "title",
    "review_id",
    "category",
    "review_img_url",
    "review_body",
    "created_at",
    "votes",
    "designer",
    "comment_count",
    "default",
  ];
  const orderAllowed = ["ASC", "DESC"];

  const queries = [];
  let queryString = "SELECT *, COUNT(review_id) AS comment_count FROM reviews ";

  if (categories) {
    queryString += "WHERE category = $1 ";
    queries.push(categories);
  }

  queryString += "GROUP BY review_id ";

  if (!sortAllowed.includes(sortBy)) {
    return Promise.reject({ status: 400, message: "invalid query" });
  }
  queryString += `ORDER BY ${sortBy} `;

  if (!orderAllowed.includes(order)) {
    return Promise.reject({ status: 400, message: "invalid query" });
  }

  queryString += `${order} `;

  const results = await db.query(queryString, queries);

  return results.rows;
};

exports.selectReviewById = async (id) => {
  const result = await db.query(
    `
      SELECT reviews.*,COUNT(comment_id) AS comment_count FROM reviews
      JOIN comments ON reviews.review_id = comments.review_id
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id, comments.comment_id;
    
    `,
    [id],
  );

  if (result.rows.length !== 0) {
    return result.rows;
  } else {
    const res = await db.query(`SELECT * FROM reviews WHERE review_id = $1`, [
      id,
    ]);

    if (res.rows.length === 0) {
      return Promise.reject({
        status: 404,
        message: "Review not found!",
      });
    } else {
      return res.rows;
    }
  }
};

exports.selectCommentsByReviewId = async (id) => {
  await doesReviewExist(id);
  const result = await db.query(
    `
      SELECT * FROM comments WHERE review_id = $1;
    `,
    [id],
  );

  return result.rows;
};

exports.selectUsers = async () => {
  const result = await db.query(`SELECT * FROM users;`);
  return result.rows;
};
