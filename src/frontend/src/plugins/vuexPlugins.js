import JwtService from "@/services/jwt.service";
import { createResources } from "@/common/helpers";

export default function (store) {
  store.$jwt = JwtService;
  store.$api = createResources();
}
