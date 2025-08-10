import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Default } from "sequelize-typescript";
import { Rutas } from "./Rutas";

@Table({ tableName: "Recorridos", timestamps: false })
export class Recorridos extends Model {
  @Column({primaryKey: true, autoIncrement: true})
  declare id_recorrido: number;

  @ForeignKey(() => Rutas)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare id_ruta: number;

  @Column({ type: DataType.DATEONLY, allowNull: false})
  declare fecha_recorrido: Date;

  @Column({ type: DataType.TIME, allowNull: false })
  declare tiempo_ruta: string;

  @Column({ type: DataType.DECIMAL(6, 2), allowNull: true })
  declare km_recorridos: number;

  @Column({ type: DataType.DECIMAL(6, 2), allowNull: true })
  declare emision_co2: number;

  @BelongsTo(() => Rutas, { foreignKey: "id_ruta" })
  declare ruta: Rutas;
}

export default Recorridos;