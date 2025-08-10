import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuarios } from "./Usuarios";

@Table({ tableName: "Ranking", timestamps: false })
export class Ranking extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare id_ranking: number;

  @ForeignKey(() => Usuarios)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare id_usuario: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare posicion_usuario: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare cantidad_rutas: number;

  @BelongsTo(() => Usuarios, { foreignKey: "id_usuario" })
  declare usuario: Usuarios;
}

export default Ranking;
