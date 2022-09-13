-- CreateTable
CREATE TABLE `admin` (
    `ID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `benefactor` (
    `ID` INTEGER NOT NULL,
    `empresa` VARCHAR(50) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beneficio` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa` VARCHAR(50) NOT NULL,
    `imagen` BLOB NOT NULL,
    `descripcion` VARCHAR(100) NOT NULL,
    `Benefactor` INTEGER NOT NULL,

    INDEX `Benefactor`(`Benefactor`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contactan` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Contacto` INTEGER NOT NULL,
    `Usuario` INTEGER NOT NULL,

    INDEX `Contacto`(`Contacto`),
    INDEX `Usuario`(`Usuario`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contacto` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `logo` BLOB NOT NULL,
    `link` VARCHAR(200) NOT NULL,
    `nroInteracciones` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donacion` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Donante` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `tipo` VARCHAR(30) NOT NULL,
    `fecha` DATE NOT NULL,
    `valor` INTEGER NOT NULL,

    INDEX `Donante`(`Donante`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donante` (
    `ID` INTEGER NOT NULL,
    `cuenta` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lugarrecoleccion` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `imagen` BLOB NOT NULL,
    `latitud` INTEGER NOT NULL,
    `longitud` INTEGER NOT NULL,
    `direrccion` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manejalugarrecoleccion` (
    `ID` INTEGER NOT NULL,
    `accion` VARCHAR(10) NULL,
    `Recolector` INTEGER NOT NULL,
    `LugarRecoleccion` INTEGER NOT NULL,

    INDEX `LugarRecoleccion`(`LugarRecoleccion`),
    INDEX `Recolector`(`Recolector`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manejanusuarios` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATE NOT NULL,
    `accion` VARCHAR(10) NOT NULL,
    `Admin` INTEGER NOT NULL,
    `Usuario` INTEGER NOT NULL,

    INDEX `Admin`(`Admin`),
    INDEX `Usuario`(`Usuario`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recolectadosen` (
    `Donacion` INTEGER NOT NULL,
    `Lugar` INTEGER NOT NULL,

    INDEX `Lugar`(`Lugar`),
    PRIMARY KEY (`Donacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recolector` (
    `ID` INTEGER NOT NULL,
    `lugarRecoleccion` INTEGER NOT NULL,

    INDEX `lugarRecoleccion`(`lugarRecoleccion`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(30) NOT NULL,
    `apellido` VARCHAR(30) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `contraseña` VARCHAR(30) NOT NULL,
    `img_perfil` BLOB NULL,
    `latitud` INTEGER NULL,
    `longitud` INTEGER NULL,
    `direccion` VARCHAR(200) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utilizabeneficio` (
    `Donante` INTEGER NOT NULL,
    `Beneficio` INTEGER NOT NULL,
    `fecha` DATE NOT NULL,
    `valor` INTEGER NOT NULL,

    INDEX `Beneficio`(`Beneficio`),
    PRIMARY KEY (`Donante`, `fecha`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `usuario`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `benefactor` ADD CONSTRAINT `benefactor_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `usuario`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `beneficio` ADD CONSTRAINT `beneficio_ibfk_1` FOREIGN KEY (`Benefactor`) REFERENCES `benefactor`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `contactan` ADD CONSTRAINT `contactan_ibfk_1` FOREIGN KEY (`Contacto`) REFERENCES `contacto`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `contactan` ADD CONSTRAINT `contactan_ibfk_2` FOREIGN KEY (`Usuario`) REFERENCES `usuario`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `donacion` ADD CONSTRAINT `donacion_ibfk_1` FOREIGN KEY (`Donante`) REFERENCES `donante`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `donante` ADD CONSTRAINT `donante_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `usuario`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `manejalugarrecoleccion` ADD CONSTRAINT `manejalugarrecoleccion_ibfk_1` FOREIGN KEY (`Recolector`) REFERENCES `recolector`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `manejalugarrecoleccion` ADD CONSTRAINT `manejalugarrecoleccion_ibfk_2` FOREIGN KEY (`LugarRecoleccion`) REFERENCES `lugarrecoleccion`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `manejanusuarios` ADD CONSTRAINT `manejanusuarios_ibfk_1` FOREIGN KEY (`Admin`) REFERENCES `admin`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `manejanusuarios` ADD CONSTRAINT `manejanusuarios_ibfk_2` FOREIGN KEY (`Usuario`) REFERENCES `usuario`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `recolectadosen` ADD CONSTRAINT `recolectadosen_ibfk_1` FOREIGN KEY (`Donacion`) REFERENCES `donacion`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `recolectadosen` ADD CONSTRAINT `recolectadosen_ibfk_2` FOREIGN KEY (`Lugar`) REFERENCES `lugarrecoleccion`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `recolector` ADD CONSTRAINT `recolector_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `usuario`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `recolector` ADD CONSTRAINT `recolector_ibfk_2` FOREIGN KEY (`lugarRecoleccion`) REFERENCES `lugarrecoleccion`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `utilizabeneficio` ADD CONSTRAINT `utilizabeneficio_ibfk_1` FOREIGN KEY (`Donante`) REFERENCES `donante`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `utilizabeneficio` ADD CONSTRAINT `utilizabeneficio_ibfk_2` FOREIGN KEY (`Beneficio`) REFERENCES `beneficio`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
