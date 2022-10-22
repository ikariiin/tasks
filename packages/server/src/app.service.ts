import { Injectable } from "@nestjs/common";
import * as packageDetails from "../package.json";

@Injectable()
export class AppService {
  getIndex(): Record<string, string> {
    return {
      name: packageDetails.name,
      version: packageDetails.version,
    };
  }
}
