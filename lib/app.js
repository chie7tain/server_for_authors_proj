"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const viewrouter = require("./routes/views");
const authorRouter = require("./routes/authors");
const userRoutes = require("./routes/user");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use(express_1.default.static("public"));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/api/v1", viewrouter);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1", authorRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
module.exports = app;
