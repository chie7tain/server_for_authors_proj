// BUILD QUERY
// 1a). Filtering

// const queryObj = { ...req.query };
// const excludedFields = ["page", "sort", "limit", "fields"];
// excludedFields.forEach((el) => delete queryObj[el]);
// // 1b). Advanced Filtering
// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

// let query = Author.find(JSON.parse(queryStr));

// 2). Sorting

// if (req.query.sort) {
//   req.query.sort = String(req.query.sort);
//   const sortBy = req.query.sort.split(",").join(" ");
//   query = query.sort(sortBy);
// } else {
//   query = query.sort("--createdAt");
// }

// 3). Field Limiting
// if (req.query.fields) {
//   req.query.fields = String(req.query.fields);
//   const fields = req.query.fields.split(",").join(" ");
//   query = query.select(fields);
// } else {
//   query = query.select("-__v");
// }

// 4). Pagination
// const page = parseInt(req.query.page as string, 10) || 1;
// const limit = parseInt(req.query.limit as string, 10) || 100;
// const skip = (page - 1) * limit;
// // const startIndex = (page - 1) * limit;
// // const endIndex = page * limit;
// // const total = await Author.countDocuments();

// query = query.skip(skip).limit(5);
// if (req.query.page) {
//   const numAuthors = await Author.countDocuments();
//   if (skip >= numAuthors) {
//     throw new Error("This page does not exist");
//   }
// }
