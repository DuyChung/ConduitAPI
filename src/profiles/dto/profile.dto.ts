export class ProfileDto {
  username?: string;
  bio?: string;
  image?: string;
  following?: boolean;
}

export class ProfileResponseDto {
  profile?: ProfileDto;
}
