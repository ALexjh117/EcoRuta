import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuarios } from "./Usuarios";

@Table({ tableName: "Sistema_Logros", timestamps: false })
export class Sistema_Logros extends Model {
  @Column({ primaryKey: true, autoIncrement: true})
  declare id_logro: number;

  @ForeignKey(() => Usuarios)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare id_usuario: number;

  @Column({ type: DataType.STRING(255), allowNull:true })
  declare descripcion_logro: string | null; //tener enc eunta la descripcion aqui ay que en la abse de datos la deje como campo nulo

  @Column({ type: DataType.INTEGER, allowNull: false})
  declare puntos_usuario: number;

  @BelongsTo(() => Usuarios, { foreignKey: "id_usuario" })
  declare usuario: Usuarios;
}

export default Sistema_Logros
