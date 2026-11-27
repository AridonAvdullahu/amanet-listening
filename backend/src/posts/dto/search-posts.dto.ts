import { Transform } from 'class-transformer';
import { IsString, Matches, MaxLength } from 'class-validator';

export class SearchPostsDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @Matches(/\S/)
  @MaxLength(200)
  q!: string;
}