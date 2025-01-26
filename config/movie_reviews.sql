
CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL, --MD5
  `created_at` timestamp NULL DEFAULT current_timestamp()
);

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
);

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `release_date` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `status` tinyint(4) DEFAULT 1
) ;
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_username_uniq` (`username`);

ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `movies` ADD `genres` VARCHAR(255) NULL AFTER `image_path`, ADD `in_theaters` VARCHAR(255) NULL AFTER `genres`, ADD `runtime` VARCHAR(255) NULL AFTER `in_theaters`, ADD `director` VARCHAR(255) NULL AFTER `runtime`, ADD `cast` VARCHAR(255) NULL AFTER `director`, ADD `distributor` VARCHAR(255) NULL AFTER `cast`, ADD `reviewer` VARCHAR(255) NULL AFTER `distributor`, ADD `mpaa_rating` VARCHAR(255) NULL AFTER `reviewer`, ADD `kids_content_caution` VARCHAR(255), ADD `teens_content_caution` VARCHAR(255),ADD `adults_content_caution` VARCHAR(255) NULL AFTER `mpaa_rating`;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;
