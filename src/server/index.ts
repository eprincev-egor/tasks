import { configDotenv } from "dotenv";
import { main } from "./main";

configDotenv();

main().catch((error) => {
    console.error(error);
    process.exit(1);
});