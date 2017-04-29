import { OAuth } from "oauth"

const createTwitterOAuth = () => {
  return new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "zvDGlRpmKPFTVOu8FrrmUDwUe",
    "LjZJM1Zzw7uXe9yrpL60G9F4fwd6xoCtoNqehZvPuyDW4jdUS9",
    "1.0A",
    null,
    "HMAC-SHA1"
  )
}

export default createTwitterOAuth;
