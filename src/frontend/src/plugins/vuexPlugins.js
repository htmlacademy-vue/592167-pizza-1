import JwtService from "@/services/jwt.service";

export default function (store) {
  store.$jwt = JwtService;
}
