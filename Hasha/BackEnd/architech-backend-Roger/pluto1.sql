-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 24, 2020 lúc 07:05 PM
-- Phiên bản máy phục vụ: 10.4.14-MariaDB
-- Phiên bản PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `pluto1`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `attributes`
--

CREATE TABLE `attributes` (
  `id` int(11) NOT NULL,
  `attribute_type_id` varchar(255) NOT NULL,
  `object_id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `attributes`
--

INSERT INTO `attributes` (`id`, `attribute_type_id`, `object_id`, `value`) VALUES
(127, '49', 59, 'true'),
(128, '50', 59, 'testt'),
(129, '49', 60, 'true'),
(130, '50', 60, '123123');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `attribute_type`
--

CREATE TABLE `attribute_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `format` varchar(255) NOT NULL,
  `value_option` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `attribute_type`
--

INSERT INTO `attribute_type` (`id`, `name`, `format`, `value_option`) VALUES
(49, 'ab3', 'Boolean', NULL),
(50, 'ab4', 'Text', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `attribute_type_object_type`
--

CREATE TABLE `attribute_type_object_type` (
  `id` int(11) NOT NULL,
  `attribute_type_id` int(11) NOT NULL,
  `object_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `attribute_type_object_type`
--

INSERT INTO `attribute_type_object_type` (`id`, `attribute_type_id`, `object_type_id`) VALUES
(124, 49, 60),
(125, 50, 60);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `combinations`
--

CREATE TABLE `combinations` (
  `id` int(11) NOT NULL,
  `relationship_type_id` int(11) NOT NULL,
  `from_object_type_id` int(11) NOT NULL,
  `to_object_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `combinations`
--

INSERT INTO `combinations` (`id`, `relationship_type_id`, `from_object_type_id`, `to_object_type_id`) VALUES
(48, 16, 51, 58),
(49, 16, 57, 58);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `object`
--

CREATE TABLE `object` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `creation_date` date NOT NULL,
  `create_by_user_id` int(11) NOT NULL,
  `object_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `object`
--

INSERT INTO `object` (`id`, `name`, `creation_date`, `create_by_user_id`, `object_type_id`) VALUES
(58, 'test', '2020-10-23', 2, 60),
(59, 'Test', '2020-10-23', 2, 60),
(60, 'test3', '2020-10-24', 2, 60),
(61, 'Test', '2020-10-24', 2, 51),
(62, 'Object Object Typ2', '2020-10-24', 2, 51),
(63, 'test5', '2020-10-24', 2, 58);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `object_type`
--

CREATE TABLE `object_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `object_type`
--

INSERT INTO `object_type` (`id`, `name`) VALUES
(50, 'ObjectType 1'),
(51, 'objectType 2'),
(57, 'tetst3'),
(58, 'tetst5'),
(59, 'tetst5'),
(60, 'tetst5');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `relationship`
--

CREATE TABLE `relationship` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `from_object_id` int(11) NOT NULL,
  `to_object_id` int(11) NOT NULL,
  `relationship_type_id` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `created_by_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `relationship`
--

INSERT INTO `relationship` (`id`, `name`, `from_object_id`, `to_object_id`, `relationship_type_id`, `created_at`, `created_by_user_id`) VALUES
(25, '', 62, 63, 16, '2020-10-24', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `relationship_type`
--

CREATE TABLE `relationship_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `a_tobdescription` text NOT NULL,
  `b_toadescription` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `relationship_type`
--

INSERT INTO `relationship_type` (`id`, `name`, `a_tobdescription`, `b_toadescription`) VALUES
(15, 'Tesst', 'tesstAB', 'Test BA'),
(16, 'Tessss', 'ssssss', 'ssssssssssssssssss');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(2, 'test@gmail.com', '$2a$10$v9BkBPw0f8vu//J.1EwLVeY5/9n10grZtXwqrq5pIDZwX5vL1yz0S'),
(3, 'lhoang295@gmail.com', '$2a$10$LK4Hn97HaWCLVrQDgd59O.ieTOYe2Ykt2N3CVxgoIMgvyj7c1P.aG'),
(4, 'lhoang295@gmail.com2222', '$2a$10$ws1gpw5ozZdneYO06Zt8/.q2/DxjCf1OK2r.qRRljRR0zU974l5Nq'),
(5, 'lhoang295@gmail.com', '$2a$10$wBbZzFitotSRvDnmjxGT7u9eecWD9nPDW4o39gWsPKzlVz1CbbA6y'),
(6, 'test123@gmail.com', '$2a$10$TqLNJsgCYahMp1vuAdNdo.4fwYoGbBYJBAgZFAAJNXWsUA896nDgu'),
(7, 'test1235@gmail.com', '$2a$10$QfNRjk721xabQq7mZJ6wS.KjLcxr.l6q6JAs/oVbnP5/V3gW7hAMC');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `attribute_type`
--
ALTER TABLE `attribute_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `attribute_type_object_type`
--
ALTER TABLE `attribute_type_object_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `combinations`
--
ALTER TABLE `combinations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `object`
--
ALTER TABLE `object`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `object_type`
--
ALTER TABLE `object_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `relationship`
--
ALTER TABLE `relationship`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `relationship_type`
--
ALTER TABLE `relationship_type`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `relationship_type` ADD FULLTEXT KEY `Name` (`name`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT cho bảng `attribute_type`
--
ALTER TABLE `attribute_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT cho bảng `attribute_type_object_type`
--
ALTER TABLE `attribute_type_object_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT cho bảng `combinations`
--
ALTER TABLE `combinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT cho bảng `object`
--
ALTER TABLE `object`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT cho bảng `object_type`
--
ALTER TABLE `object_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT cho bảng `relationship`
--
ALTER TABLE `relationship`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT cho bảng `relationship_type`
--
ALTER TABLE `relationship_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
