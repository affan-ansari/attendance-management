import { Response } from "express";

import { ApiRequest } from "../common/interfaces";
import { buildSuccessResponse } from "../common/helpers";
import * as homeServices from "../services/index";

export const helloFromServer = async (req: ApiRequest, res: Response) => {
  const data = homeServices.helloFromServer();
  res.json(buildSuccessResponse(data));
};
