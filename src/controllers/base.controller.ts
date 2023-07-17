import { Response } from 'express';

abstract class BaseController {
  public jsonResponse(
    res: Response, code: number, result: JSON | Object | null
  ) {
    return res.status(code).json({
      status: 200,
      data: result
    });
  }
}

export default BaseController;