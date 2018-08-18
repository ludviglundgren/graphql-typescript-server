import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId
} from "typeorm";
import { User } from "./User";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column("text")
  title: string;

  @Column("text")
  content: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @RelationId((post: Post) => post.user)
  userId: number;
}
