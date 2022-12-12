-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 12-12-2022 a las 23:20:31
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cecati`
--

-- --------------------------------------------------------

--
-- Estructura para la vista `movimientosConProducto`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`myuser`@`%` SQL SECURITY DEFINER VIEW `movimientosConProducto`  AS SELECT `productos`.`nombre` AS `producto`, `productos`.`partida` AS `partida`, `productos`.`unidad` AS `unidad`, `movimientos`.`createdAt` AS `fecha`, `movimientos`.`cantidad` AS `cantidad`, `movimientos`.`tipo` AS `tipo`, `movimientos`.`precio` AS `precio`, `movimientos`.`observacion` AS `observacion` FROM (`movimientos` join `productos` on((`movimientos`.`producto` = `productos`.`clave`)))  ;

--
-- VIEW `movimientosConProducto`
-- Datos: Ninguna
--

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
