-- phpMyAdmin SQL Dump
-- version 3.5.8.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2013 at 07:51 PM
-- Server version: 5.6.11-log
-- PHP Version: 5.4.14

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gymsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE IF NOT EXISTS `activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_activities_members` (`member_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `member_id`, `timestamp`) VALUES
(1, 3, '2013-10-20 05:45:04'),
(2, 15, '2013-10-20 07:34:09');

-- --------------------------------------------------------

--
-- Table structure for table `cycles`
--

CREATE TABLE IF NOT EXISTS `cycles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `cycles`
--

INSERT INTO `cycles` (`id`, `name`) VALUES
(1, 'monthly'),
(2, 'annually');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `groups_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) NOT NULL DEFAULT '0',
  `first_name` varchar(50) NOT NULL DEFAULT '0',
  `last_name` varchar(50) NOT NULL DEFAULT '0',
  `address` varchar(50) NOT NULL DEFAULT '0',
  `phone` varchar(50) NOT NULL DEFAULT '0',
  `dob` date NOT NULL DEFAULT '0000-00-00',
  `email` varchar(50) NOT NULL DEFAULT '0000-00-00',
  `photo` varchar(50) NOT NULL DEFAULT '0000-00-00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `number`, `first_name`, `last_name`, `address`, `phone`, `dob`, `email`, `photo`, `created_at`, `updated_at`) VALUES
(1, 0, 'afsaf', 'safsafasfasfas', '', '', '0000-00-00', '', '', '2013-10-08 11:24:22', '2013-10-08 11:24:22'),
(3, 0, 'John Dave', 'Decano', 'dfdfdsfdsfdsfdsfs', 'dgadsgdsa', '2013-10-16', 'johndavedecano@hotmail.com', '8e8847c1bdf012037ee13bb62da8a5c1.jpg', '2013-10-08 12:07:32', '2013-10-10 09:39:45'),
(10, 2147483647, 'dadgads', 'sagdsagdsag', 'asdgagdasgadsg', '421421421', '2013-10-22', 'davedave232323@gmail.com', '', '2013-10-08 12:13:06', '2013-10-08 12:13:06'),
(11, 2147483647, 'dagasdgsd', 'sdagsadgsadg', 'sdagadsgdsagasd', 'gsdgsdgs', '2013-10-22', 'daviddecano@gmail.com', '', '2013-10-08 12:14:10', '2013-10-08 12:14:10'),
(12, 0, 'dagasdgsd', 'sdagsadgsadg', 'sdagadsgdsagasd', 'gsdgsdgs', '2013-10-22', 'dave@gmail.com', '', '2013-10-08 12:14:44', '2013-10-08 12:14:44'),
(13, 0, 'dsgsag', 'sdgdsagasd', 'fdsafadsfdsafdasfas', 'sadfasdfdsa', '2013-10-29', 'johndavedecano@gmail.com', '', '2013-10-08 12:17:43', '2013-10-10 09:38:24'),
(14, 0, 'Paulo', 'Decano', 'dfdasfdasfdasfasdf', 'sadaf', '0000-00-00', 'joddddavedecano@hotmail.com', '', '2013-10-08 12:19:34', '2013-10-10 09:38:33'),
(15, 0, 'Rose Ann', 'Solano', 'sdfasfasd', '241241', '2013-10-22', 'johndave.decano@facebook.com', 'caa707f97407c07371136aaf471a91d4.jpg', '2013-10-08 12:25:36', '2013-10-08 12:25:36');

-- --------------------------------------------------------

--
-- Table structure for table `members_packages`
--

CREATE TABLE IF NOT EXISTS `members_packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL DEFAULT '0',
  `package_id` int(11) DEFAULT NULL,
  `expiration` timestamp NULL DEFAULT NULL,
  `registration` timestamp NULL DEFAULT NULL,
  `suspended_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `members_packages`
--

INSERT INTO `members_packages` (`id`, `member_id`, `package_id`, `expiration`, `registration`, `suspended_at`, `status`) VALUES
(2, 3, 2, '2013-11-18 16:00:00', '2013-10-18 16:00:00', '2013-10-19 16:00:00', 1),
(3, 14, 2, '2013-10-19 16:00:00', '2013-10-19 16:00:00', NULL, 0),
(4, 14, 3, '2013-10-19 16:00:00', '2013-10-19 16:00:00', '2013-10-19 16:00:00', 0),
(5, 14, 1, '2013-10-19 16:00:00', '2013-10-19 16:00:00', NULL, 0),
(6, 15, 2, '2013-11-18 16:00:00', '2013-10-19 16:00:00', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2012_12_06_225921_migration_cartalyst_sentry_install_users', 1),
('2012_12_06_225929_migration_cartalyst_sentry_install_groups', 1),
('2012_12_06_225945_migration_cartalyst_sentry_install_users_groups_pivot', 1),
('2012_12_06_225988_migration_cartalyst_sentry_install_throttle', 1);

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE IF NOT EXISTS `packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `cycle_id` int(11) NOT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `service_id`, `cycle_id`, `price`) VALUES
(1, 8, 1, '25'),
(2, 9, 1, '35'),
(3, 5, 2, '250');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`) VALUES
(5, 'Fitness'),
(6, 'Karate'),
(7, 'Tae Kwon Do'),
(8, 'Programming'),
(9, 'Dancing'),
(10, 'Kick Boxing'),
(11, 'Aerobics'),
(12, 'Muai Tai'),
(14, 'Brazillian Ju Jitsu'),
(15, 'Python');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `label` varchar(50) NOT NULL DEFAULT '0',
  `value` text NOT NULL,
  `options` text NOT NULL,
  `rules` text NOT NULL,
  `type` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `name`, `label`, `value`, `options`, `rules`, `type`) VALUES
(1, 'currency', 'Currency', 'php', '', 'required', 'text'),
(2, 'website_title', 'Website Title', 'Gym Manager', '', '', 'text'),
(3, 'smtp_host', 'SMTP Host', 'mail.makatisolutions.com', '', 'required', 'text'),
(4, 'smtp_user', 'SMTP User', 'info@makatisolutions.com', '', 'required', 'text'),
(5, 'email_protocol', 'Email Protocol', 'smtp', '', 'required', 'text'),
(6, 'smtp_pass', 'SMTP Pass', 'malugay2013', '', 'required', 'pass'),
(7, 'smtp_encryption', 'SMTP Encryption', 'ssl', '', 'required', 'text'),
(8, 'email_users_expire', 'Notify Members When Package Expires', 'yes', 'yes,no', 'required', 'option'),
(9, 'smtp_port', 'SMPT Port', '25', '', 'required', 'text'),
(10, 'admin_email', 'Admin Email', 'info@makatisolutions.com', '', 'email|required', 'text');

-- --------------------------------------------------------

--
-- Table structure for table `throttle`
--

CREATE TABLE IF NOT EXISTS `throttle` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `ip_address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `attempts` int(11) NOT NULL DEFAULT '0',
  `suspended` tinyint(1) NOT NULL DEFAULT '0',
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `last_attempt_at` timestamp NULL DEFAULT NULL,
  `suspended_at` timestamp NULL DEFAULT NULL,
  `banned_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `throttle`
--

INSERT INTO `throttle` (`id`, `user_id`, `ip_address`, `attempts`, `suspended`, `banned`, `last_attempt_at`, `suspended_at`, `banned_at`) VALUES
(1, 1, '127.0.0.1', 0, 0, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8_unicode_ci,
  `activated` tinyint(1) NOT NULL DEFAULT '0',
  `activation_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `activated_at` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `persist_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reset_password_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_activation_code_index` (`activation_code`),
  KEY `users_reset_password_code_index` (`reset_password_code`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `permissions`, `activated`, `activation_code`, `activated_at`, `last_login`, `persist_code`, `reset_password_code`, `first_name`, `last_name`, `created_at`, `updated_at`) VALUES
(1, 'admin@admin.com', '$2y$10$AzJrqIO1NK3y4YGFQgYJuu3tOdpQam/ZLzSg3Y49sstBDy7qGc0rG', '{"superuser":1}', 1, NULL, NULL, '2013-10-20 08:24:54', '$2y$10$fF9X.XYeXzYs9Vz0ugYMOuV2FJCFCFZBLgRRj.p.RCKFY7DQMuNuO', NULL, NULL, NULL, '2013-10-08 04:57:01', '2013-10-20 08:24:54');

-- --------------------------------------------------------

--
-- Table structure for table `users_groups`
--

CREATE TABLE IF NOT EXISTS `users_groups` (
  `user_id` int(10) unsigned NOT NULL,
  `group_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `FK_activities_members` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
