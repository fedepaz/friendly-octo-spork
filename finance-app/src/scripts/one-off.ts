import { password } from "bun";

const mail = "admin@example.com";
const passwordString = "MySuperSecretPassword";
const hash = await password.hash(passwordString);

console.log(hash);
console.log("••••••••");
console.log(passwordString);
