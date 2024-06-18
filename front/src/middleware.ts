import { NextRequest } from "next/server";
import { updateSession } from "./libs";

export const middleware = async (request: NextRequest) => {
  return await updateSession(request);
}