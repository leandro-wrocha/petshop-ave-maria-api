import { app } from "@/shared/infra/http/app";

app.listen(3302, () => console.log(process.env.NODE_ENV));
