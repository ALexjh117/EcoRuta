import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuarios } from "./Usuarios";

@Table({ tableName: "Reportes_Usuarios", timestamps: false })
export class Reportes_Usuarios extends Model {
  @Column({primaryKey: true, autoIncrement: true})
  declare id_reporte: number;

  @ForeignKey(() => Usuarios)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare id_usuario: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare tipo_reporte: string;

  @Column({ type: DataType.DATEONLY, allowNull:false })
  declare fecha_generacion: Date;

  @Column({ type: DataType.STRING(255), allowNull: true})
  declare archivo_ruta: string | null;

  @BelongsTo(() => Usuarios, { foreignKey: "id_usuario" })
  declare usuario: Usuarios;
}

export default Reportes_Usuarios;