-- sql/test-data.sql
-- Insert test users
INSERT INTO users (email, password_hash, full_name) VALUES
('john@example.com', '$2a$10$somehashedpassword', 'John Doe'),
('jane@example.com', '$2a$10$somehashedpassword', 'Jane Smith');

-- Insert test campaigns
INSERT INTO campaigns (creator_id, title, description, goal_amount, end_date) VALUES
(1, 'First Campaign', 'Test campaign description', 10000.00, DATE_ADD(NOW(), INTERVAL 30 DAY)),
(2, 'Second Campaign', 'Another test campaign', 5000.00, DATE_ADD(NOW(), INTERVAL 15 DAY));

-- Insert test contributions
INSERT INTO contributions (campaign_id, contributor_id, amount) VALUES
(1, 2, 100.00),
(1, 1, 200.00),
(2, 1, 150.00);