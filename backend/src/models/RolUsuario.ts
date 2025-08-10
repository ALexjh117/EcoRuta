import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuarios } from "./Usuarios";

@Table({ tableName: "RolUsuario", timestamps: false})
export class RolUsuario extends Model {
  @Column({primaryKey: true, autoIncrement: true})
  declare id_rol: number;

  @ForeignKey(() => Usuarios)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare id_usuario: number;

  @Column({ type: DataType.ENUM("Admin", "Participante Rutas"), allowNull: false })
  declare tipo_rol: string;

  @BelongsTo(() => Usuarios, { foreignKey: "id_usuario" }) 
  declare usuario: Usuarios;
}

export default RolUsuario;