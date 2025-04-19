const adminAuth = (req, res, next) => {
  console.log("checking the authorization");

  const token = "xyz";

  const isAuthorized = token === "xyz";
  if (isAuthorized) {
    next();
    console.log("authorized");
  } else {
    console.log("not authorized");
    res.send("not authorized");
  }
};
const userAuth = (req, res, next) => {
  console.log("checking the authorization");

  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (isAuthorized) {
    next();
    console.log("authorized");
  } else {
    console.log("not authorized");
    res.send("not authorized");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
