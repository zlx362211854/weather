import { CommonResponse, ResponseCode } from "@/types/response";
import { Weather } from "@/types/weather";
import { NextApiRequest, NextApiResponse } from "next";
import { getCoodinate, getWeatherByCoodinate } from "./handler";

export default async function GET(req: NextApiRequest, res: NextApiResponse<CommonResponse<Weather>>) {
  try {
    const coodinate = await getCoodinate(req);
    const weather = await getWeatherByCoodinate(coodinate);
    res.status(200).json({ code: ResponseCode.success, message: 'success', data: weather });
  } catch (err) {
    res.status(500).json({ code: ResponseCode.failed, message: err });
  }
}
