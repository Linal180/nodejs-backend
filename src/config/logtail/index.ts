import { Logtail } from "@logtail/node";
import { config } from "../";

export const logtail = new Logtail(config.logtail.sourceToken);
