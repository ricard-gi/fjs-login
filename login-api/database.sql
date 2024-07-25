-- Adminer 4.8.1 MySQL 5.5.5-10.8.3-MariaDB-1:10.8.3+maria~jammy dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

drop database login_db;
CREATE DATABASE `login_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `login_db`;

DROP TABLE IF EXISTS `usuaris`;
CREATE TABLE `usuaris` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `idioma` varchar(10) DEFAULT NULL,
  `perfil` varchar(15) DEFAULT NULL,
  `nom` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `usuaris` (`id`, `email`, `password`, `idioma`, `perfil`, `nom`) VALUES
(1,	'a@b',	'$2b$10$unpx6DGehRF/tg/JLPidxugcf0hXlSUTbPB1x5SUkl.ASqQsF/V8S',	'ca',	'admin',	'ricard')


-- 2023-03-31 07:02:33