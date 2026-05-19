import { CommentEntity } from '../../database/entities/comment.entity';

export interface CommentsResponseType {
  comments: CommentEntity[];
}
