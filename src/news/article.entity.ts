import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sourceId: string;

  @Column()
  sourceName: string;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ unique: true })
  url: string;

  @Column({ type: 'datetime' })
  publishedAt: string;

  @Column({ type: 'text' })
  content: string;
}

export default Article;
