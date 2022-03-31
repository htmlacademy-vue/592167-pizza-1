import JwtService from "@/services/jwt.service";
import { createResources } from "@/common/helpers";
import Notifier from "@/plugins/notifier";

export default function (store) {
  store.$jwt = JwtService;
  store.$notifier = new Notifier(store);
  store.$api = createResources(store.$notifier);
}
