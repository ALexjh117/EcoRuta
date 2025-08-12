-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecoruta
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ranking`
--

DROP TABLE IF EXISTS `ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranking` (
  `id_ranking` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `posicion_usuario` int NOT NULL,
  `cantidad_rutas` int NOT NULL,
  PRIMARY KEY (`id_ranking`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `ranking_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranking`
--

LOCK TABLES `ranking` WRITE;
/*!40000 ALTER TABLE `ranking` DISABLE KEYS */;
INSERT INTO `ranking` VALUES (1,1,1,15),(2,2,3,10),(3,3,5,7),(4,4,2,12),(5,5,4,9);
/*!40000 ALTER TABLE `ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recorridos`
--

DROP TABLE IF EXISTS `recorridos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recorridos` (
  `id_recorrido` int NOT NULL AUTO_INCREMENT,
  `id_ruta` int NOT NULL,
  `fecha_recorrido` date NOT NULL,
  `tiempo_ruta` time NOT NULL,
  `km_recorridos` decimal(6,2) DEFAULT NULL,
  `emision_co2` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`id_recorrido`),
  KEY `id_ruta` (`id_ruta`),
  CONSTRAINT `recorridos_ibfk_1` FOREIGN KEY (`id_ruta`) REFERENCES `rutas` (`id_ruta`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recorridos`
--

LOCK TABLES `recorridos` WRITE;
/*!40000 ALTER TABLE `recorridos` DISABLE KEYS */;
INSERT INTO `recorridos` VALUES (1,1,'2025-07-01','00:45:00',5.20,2.30),(2,2,'2025-07-02','01:20:00',7.80,4.80),(3,3,'2025-07-03','00:35:00',4.10,5.30),(4,4,'2025-07-04','00:50:00',6.00,1.20),(5,5,'2025-07-05','01:10:00',8.40,3.20),(6,6,'2025-08-11','00:30:00',0.87,0.00);
/*!40000 ALTER TABLE `recorridos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportes_usuarios`
--

DROP TABLE IF EXISTS `reportes_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportes_usuarios` (
  `id_reporte` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `tipo_reporte` varchar(100) NOT NULL,
  `fecha_generacion` date NOT NULL,
  `archivo_ruta` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_reporte`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `reportes_usuarios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportes_usuarios`
--

LOCK TABLES `reportes_usuarios` WRITE;
/*!40000 ALTER TABLE `reportes_usuarios` DISABLE KEYS */;
INSERT INTO `reportes_usuarios` VALUES (1,1,'Reporte mensual','2025-07-01','/reportes/juan_202507.pdf'),(2,2,'Reporte semanal','2025-07-03','/reportes/ana_202507.pdf'),(3,3,'Reporte anual','2025-07-01','/reportes/carlos_202507.pdf'),(4,4,'Reporte mensual','2025-07-02','/reportes/luisa_202507.pdf'),(5,5,'Reporte diario','2025-07-05','/reportes/sofia_202507.pdf');
/*!40000 ALTER TABLE `reportes_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolusuario`
--

DROP TABLE IF EXISTS `rolusuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolusuario` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `tipo_rol` enum('Admin','Participante Rutas') NOT NULL,
  PRIMARY KEY (`id_rol`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `rolusuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolusuario`
--

LOCK TABLES `rolusuario` WRITE;
/*!40000 ALTER TABLE `rolusuario` DISABLE KEYS */;
INSERT INTO `rolusuario` VALUES (1,1,'Admin'),(2,2,'Participante Rutas'),(3,3,'Participante Rutas'),(4,4,'Admin'),(5,5,'Participante Rutas'),(6,10,'Participante Rutas'),(7,11,'Participante Rutas');
/*!40000 ALTER TABLE `rolusuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutas`
--

DROP TABLE IF EXISTS `rutas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutas` (
  `id_ruta` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `nombre_ruta` varchar(100) NOT NULL,
  `punto_origen_lat` decimal(9,6) NOT NULL,
  `punto_origen_lng` decimal(9,6) NOT NULL,
  `punto_destino_lat` decimal(9,6) NOT NULL,
  `punto_destino_lng` decimal(9,6) NOT NULL,
  `medio_transporte` enum('bicicleta','caminata','transporte publico') NOT NULL,
  PRIMARY KEY (`id_ruta`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `rutas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutas`
--

LOCK TABLES `rutas` WRITE;
/*!40000 ALTER TABLE `rutas` DISABLE KEYS */;
INSERT INTO `rutas` VALUES (1,1,'Ruta Centro Histórico',2.444500,-76.606100,2.453100,-76.609900,'bicicleta'),(2,2,'Ruta Parque Nacional',2.442100,-76.601000,2.456700,-76.607700,'caminata'),(3,3,'Ruta Universidad',2.447700,-76.605000,2.460000,-76.602000,'transporte publico'),(4,4,'Ruta Mercado',2.440000,-76.604500,2.455000,-76.610000,'bicicleta'),(5,5,'Ruta Estadio',2.441200,-76.600500,2.458900,-76.609000,'caminata'),(6,8,'Ruta desde app',4.691575,-74.125784,4.697221,-74.120290,'caminata');
/*!40000 ALTER TABLE `rutas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sistema_logros`
--

DROP TABLE IF EXISTS `sistema_logros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sistema_logros` (
  `id_logro` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `descripcion_logro` varchar(255) DEFAULT NULL,
  `puntos_usuario` int NOT NULL,
  PRIMARY KEY (`id_logro`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `sistema_logros_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sistema_logros`
--

LOCK TABLES `sistema_logros` WRITE;
/*!40000 ALTER TABLE `sistema_logros` DISABLE KEYS */;
INSERT INTO `sistema_logros` VALUES (1,1,'Primer recorrido completado',10),(2,2,'5 rutas completadas',50),(3,3,'Usuario activo',20),(4,4,'10 rutas completadas',100),(5,5,'Participación en evento especial',30),(6,8,'Recorrido de 0.87 km en caminata',6);
/*!40000 ALTER TABLE `sistema_logros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `foto_perfil` varchar(500) DEFAULT NULL,
  `apellido` varchar(100) NOT NULL,
  `identificacionUsuario` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `fecha_registro` date NOT NULL,
  `token_verificacion` varchar(12) DEFAULT NULL,
  `actividad_usuario` enum('alta','media','baja') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo` (`correo`),
  UNIQUE KEY `google_id` (`google_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juan',NULL,NULL,'Pérez','1234567890','juan.perez@mail.com','contrasena1','3101234567','2025-01-10','abc123def456','alta'),(2,'Ana',NULL,NULL,'Gómez','0987654321','ana.gomez@mail.com','contrasena2','3107654321','2025-01-15','def789ghi012','media'),(3,'Carlos',NULL,NULL,'Ramírez','1122334455','carlos.ramirez@mail.com','contrasena3','3109876543','2025-02-01',NULL,'baja'),(4,'Luisa',NULL,NULL,'Martínez','5566778899','luisa.martinez@mail.com','contrasena4','3112345678','2025-02-10','ghi345jkl678','alta'),(5,'Sofía',NULL,NULL,'López','6677889900','sofia.lopez@mail.com','contrasena5','3119876543','2025-03-05',NULL,'media'),(8,'David Santiagol','118303317534267993146','https://lh3.googleusercontent.com/a/ACg8ocJscPmgbWjzM4o7I0n-uM0Yw4CppXShQhyL2Cno9sBpSuuo-g=s96-c','Rengifo','1451','santiagorengisfo310@gmail.com','123456s7','31564552120','2025-08-11',NULL,'media'),(9,'david santiago','108445555517535351939','https://lh3.googleusercontent.com/a/ACg8ocL56rQJ3SXmTixu9e694gMP59X-Ith5iQnNglEMg3WWXsksiw=s96-c','rengifo guacheta','','davidsantiagorengifoguacheta@gmail.com','','','2025-08-12',NULL,'alta'),(10,'ELVIO',NULL,NULL,'LOPEZ','1215365316','maria.gomez@example.com','$2b$10$xA2RYu8VJDt19r8FVJo0Ruy2eYLxXAC3Ju9uTZ0g6w/ym7lky.iX6','3450860910','2025-08-12',NULL,'media'),(11,'Yonky',NULL,NULL,'SAA','9875642','yonky.30@example.com','$2b$10$VDdQb69lDzZLIwGo/DrR/uL/PA.GAhoR6vghEvf/uDxGQ1ZHDroiC','3250478954','2025-08-12',NULL,'media');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-12 13:15:10
