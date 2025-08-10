import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Usuarios } from "./Usuarios";
import { Recorridos } from "./Recorridos";

@Table({ tableName: "Rutas", timestamps: false })
export class Rutas extends Model {
  @Column({primaryKey: true, autoIncrement: true})
  declare id_ruta: number;

  @ForeignKey(() => Usuarios)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare id_usuario: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare nombre_ruta: string;

  @Column({ type: DataType.DECIMAL(9, 6), allowNull: false })
  declare punto_origen_lat: number;

  @Column({ type: DataType.DECIMAL(9, 6), allowNull: false })
  declare punto_origen_lng: number;

  @Column({ type: DataType.DECIMAL(9, 6), allowNull: false })
  declare punto_destino_lat: number;

  @Column({ type: DataType.DECIMAL(9, 6), allowNull: false })
  declare punto_destino_lng: number;

  @Column({ type: DataType.ENUM("bicicleta", "caminata", "transporte publico"), allowNull: false })
  declare medio_transporte: string;

  @BelongsTo(() => Usuarios, { foreignKey: "id_usuario" })
  declare usuario: Usuarios;

  @HasMany(() => Recorridos, { foreignKey: "id_ruta" })
  declare recorridos: Recorridos[];
}

export default Rutas;