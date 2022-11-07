import { Column, Model, Table, HasMany} from 'sequelize-typescript';
import { Post } from 'src/post/model/post.model';

@Table
export class User extends Model {
   
    @Column({primaryKey: true, autoIncrement: true})
    id: number;
  
    @Column
    name: string;
  
    @Column
    email: string;
  
    @Column
    password: string;

    @HasMany(()=>Post)
    posts: Post[];

    

}