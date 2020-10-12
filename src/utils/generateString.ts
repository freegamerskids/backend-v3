const { randomBytes } = require("crypto");

export default (len?: number) => randomBytes(len ? len : 4).toString("hex"); 