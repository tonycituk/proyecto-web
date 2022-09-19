CREATE TABLE `movimientos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idMovimiento` int NOT NULL,
  `cantidad` int NOT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` float NOT NULL,
  `producto` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` double NOT NULL,
  `observacion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Ninguna',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;