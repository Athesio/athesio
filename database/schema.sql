-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
-- 
-- ---
Create database athesio;

Use athesio;

DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users`
(
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `github_id` INTEGER NULL,
  `github_username` VARCHAR (255),
  `github_pic` VARCHAR (255),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'rooms'
-- 
-- ---

DROP TABLE IF EXISTS `Rooms`;
DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms`
(
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `room_uuid` VARCHAR (255),
  `firebase_ref` VARCHAR (255),
  `create_date` DATETIME,
  `last_modified_date` DATETIME,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'messages'
-- 
-- ---

DROP TABLE IF EXISTS `Messages`;
DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages`
(
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `text` VARCHAR (500),
  `create_time` DATETIME,
  `user_id` INTEGER,
  `room_id` INTEGER,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users_rooms'
-- 
-- ---

DROP TABLE IF EXISTS `Users_Rooms`;
DROP TABLE IF EXISTS `users_rooms`;

CREATE TABLE `users_rooms`
(
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER,
  `room_id` INTEGER,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (room_id) REFERENCES `rooms` (`id`); 
ALTER TABLE `users_rooms` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `users_rooms` ADD FOREIGN KEY (room_id) REFERENCES `rooms` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users_rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`github_id`,`github_username`,`github_pic`) VALUES
-- ('','','','');
-- INSERT INTO `rooms` (`id`,`room_uuid`,`firebase_ref`,`create_date`,`last_modified_date`) VALUES
-- ('','','','','');
-- INSERT INTO `messages` (`id`,`text`,`create_time`,`user_id`,`room_id`) VALUES
-- ('','','','','');
-- INSERT INTO `users_rooms` (`id`,`user_id`,`room_id`) VALUES
-- ('','','');
