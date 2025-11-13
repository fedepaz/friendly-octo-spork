import { password } from "bun";

const mail = "admin@example.com";
const passwordString = "123456789";
// just for development then change to a more secure password
const hash = await password.hash(passwordString);

console.log(hash);
console.log("••••••••");
console.log(passwordString);
