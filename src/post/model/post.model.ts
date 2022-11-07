import { Column, Model, Table, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';
import { Status } from '../post-types';

@Table
export class Post extends Model {

    @Column({primaryKey: true, autoIncrement: true})
    id: number;

    @Column
    title: string;

    @Column
    content: string;

    @Column
    status: Status;

    
    @ForeignKey(()=>User)
    @Column
    authorId: number;

    @BelongsTo(()=>User)
    user: User;
}