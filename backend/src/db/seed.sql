CREATE DATABASE IF NOT EXISTS db_daniels
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE db_daniels;

DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  parent_id INT DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_parent_folder FOREIGN KEY (parent_id) REFERENCES folders(id) ON DELETE SET NULL
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;

CREATE TABLE files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  folder_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  size INT DEFAULT 0,
  mime_type VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_folder_file FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;

INSERT INTO folders (name, parent_id) VALUES
('Documents', NULL),
('Media', NULL),
('Projects', NULL);

INSERT INTO folders (name, parent_id) VALUES
('Docs - Sub 1', 1),
('Docs - Sub 2', 1),
('Media - Sub 1', 2),
('Media - Sub 2', 2),
('Projects - Sub 1', 3);

INSERT INTO files (folder_id, name, size, mime_type) VALUES
(1, 'Resume.pdf', 102400, 'application/pdf'),
(2, 'Notes.txt', 2048, 'text/plain'),
(4, 'Image.png', 512000, 'image/png'),
(5, 'Video.mp4', 10485760, 'video/mp4'),
(6, 'ProjectPlan.docx', 30720, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');