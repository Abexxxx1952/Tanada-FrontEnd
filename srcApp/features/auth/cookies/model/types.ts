export type JwtTokenData = "sub" | "email" | "exp" | "iat" | "permissions";

export type JwtTokenType = "access_token" | "refresh_token";

export type JwtRefreshTokenType = {
  access_token: string | undefined;
  refresh_token: string | undefined;
};
