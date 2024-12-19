create database crowdfunding_db;
use crowdfunding_db;
-- Drop existing tables if they exist
DROP TABLE IF EXISTS contributions;
DROP TABLE IF EXISTS campaigns;
DROP TABLE IF EXISTS users;

-- Simplified Users table
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB;

-- Simplified Campaigns table
CREATE TABLE campaigns (
    campaign_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    creator_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    goal_amount DECIMAL(15,2) NOT NULL,
    current_amount DECIMAL(15,2) DEFAULT 0.00,
    end_date TIMESTAMP NOT NULL,
    status ENUM('ACTIVE', 'COMPLETED', 'CANCELLED') DEFAULT 'ACTIVE',
    image_url VARCHAR(512),
    FOREIGN KEY (creator_id) REFERENCES users(user_id),
    INDEX idx_creator (creator_id)
) ENGINE=InnoDB;

-- Simplified Contributions table
CREATE TABLE contributions (
    contribution_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    campaign_id BIGINT NOT NULL,
    contributor_id BIGINT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(campaign_id),
    FOREIGN KEY (contributor_id) REFERENCES users(user_id),
    INDEX idx_campaign_contribution (campaign_id)
) ENGINE=InnoDB;

-- Simple trigger to update campaign amount
DELIMITER //

CREATE TRIGGER after_contribution_insert
AFTER INSERT ON contributions
FOR EACH ROW
BEGIN
    UPDATE campaigns 
    SET current_amount = current_amount + NEW.amount
    WHERE campaign_id = NEW.campaign_id;
END//

DELIMITER ;