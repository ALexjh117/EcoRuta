import {Table, Column, Model, DataType, HasMany,BelongsTo} from "sequelize-typescript";

import {RolUsuario} from '../models/RolUsuario'
import { Sistema_Logros} from '../models/SistemaLogros'
import {Rutas} from '../models/Rutas'
import {Reportes_Usuarios} from '../models/ReportesUsuarios'
import {Ranking} from '../models/Ranking'


@Table({tableName: "Usuarios", timestamps: false})
export class Usuarios extends Model {
  
  @Column({primaryKey: true, autoIncrement: true})
  declare id_usuario: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  declare nombre: string;

  @Column({type: DataType.STRING(100), allowNull: false})
  declare apellido: string

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare identificacionUsuario: string;

  @Column({type: DataType.STRING(100), allowNull: false})
  declare correo: string;

  @Column({type: DataType.STRING(255), allowNull: false})
  declare contrasena: string;

  @Column({type: DataType.STRING(20), allowNull: false})
  declare telefono: string;

  @Column({type: DataType.DATEONLY, allowNull: false})
  declare fecha_registro: Date;

  @Column({type: DataType.STRING(12), allowNull: true})
  declare token_verificacion: string | null;

  @Column({type: DataType.ENUM("alta", "media", "baja"), allowNull:false})
  declare actividad_usuario: string

  @HasMany(() => RolUsuario, { foreignKey: "id_usuario" })
  declare roles: RolUsuario[];

  @HasMany(() => Sistema_Logros, { foreignKey: "id_usuario" })
  declare logros: Sistema_Logros[];

  @HasMany(() => Rutas, { foreignKey: "id_usuario" })
  declare rutas: Rutas[];

  @HasMany(() => Reportes_Usuarios, { foreignKey: "id_usuario" })
  declare reportes: Reportes_Usuarios[];
  @BelongsTo(() => Usuarios, { foreignKey: "id_usuario" })
  declare usuario: Usuarios;

  @HasMany(() => Ranking, { foreignKey: "id_usuario" })
  declare ranking: Ranking[];
  
}

export default Usuarios;