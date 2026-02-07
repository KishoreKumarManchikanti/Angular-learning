-- =====================================================
-- News Feed Application - Seed Data
-- =====================================================
-- This script inserts initial test data for development

-- =====================================================
-- USERS (8 users - mix of verified and regular)
-- =====================================================

INSERT INTO users (id, username, email, password_hash, display_name, bio, avatar_url, is_verified, role, posts_count, followers_count, following_count)
VALUES
    -- Verified News Sources
    ('11111111-1111-1111-1111-111111111111', 'techdaily', 'tech@daily.com', '$2b$10$dummyhash', 'Tech Daily', 'Your daily source for technology news and updates. Breaking tech stories 24/7.', 'https://api.dicebear.com/7.x/initials/svg?seed=techdaily&backgroundColor=3b82f6', true, 'verified_creator', 15, 125000, 50),
    ('22222222-2222-2222-2222-222222222222', 'sportshub', 'sports@hub.com', '$2b$10$dummyhash', 'Sports Hub', 'All things sports! From football to basketball, we cover it all.', 'https://api.dicebear.com/7.x/initials/svg?seed=sportshub&backgroundColor=22c55e', true, 'verified_creator', 12, 89000, 30),
    ('33333333-3333-3333-3333-333333333333', 'financenow', 'finance@now.com', '$2b$10$dummyhash', 'Finance Now', 'Real-time financial news, market analysis, and investment insights.', 'https://api.dicebear.com/7.x/initials/svg?seed=financenow&backgroundColor=eab308', true, 'verified_creator', 10, 75000, 25),
    ('44444444-4444-4444-4444-444444444444', 'healthtips', 'health@tips.com', '$2b$10$dummyhash', 'Health Tips', 'Daily health and wellness tips for a better life.', 'https://api.dicebear.com/7.x/initials/svg?seed=healthtips&backgroundColor=ef4444', false, 'user', 8, 45000, 100),
    ('55555555-5555-5555-5555-555555555555', 'travelworld', 'travel@world.com', '$2b$10$dummyhash', 'Travel World', 'Exploring the world one destination at a time. #wanderlust', 'https://api.dicebear.com/7.x/initials/svg?seed=travelworld&backgroundColor=8b5cf6', true, 'verified_creator', 9, 62000, 80),
    -- Regular Users
    ('66666666-6666-6666-6666-666666666666', 'johndoe', 'john@example.com', '$2b$10$dummyhash', 'John Doe', 'Software developer and tech enthusiast. Love coding and coffee.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe', false, 'user', 5, 1200, 350),
    ('77777777-7777-7777-7777-777777777777', 'janedoe', 'jane@example.com', '$2b$10$dummyhash', 'Jane Doe', 'Designer | Photographer | Coffee addict ☕', 'https://api.dicebear.com/7.x/avataaars/svg?seed=janedoe', false, 'user', 7, 2500, 420),
    ('88888888-8888-8888-8888-888888888888', 'mike_tech', 'mike@tech.com', '$2b$10$dummyhash', 'Mike Tech', 'Tech reviewer and gadget lover. Building the future one line at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=miketech', true, 'verified_creator', 11, 35000, 150)
ON CONFLICT (id) DO NOTHING;

-- Current user for testing
INSERT INTO users (id, username, email, password_hash, display_name, bio, avatar_url, is_verified)
VALUES ('00000000-0000-0000-0000-000000000001', 'currentuser', 'current@user.com', '$2b$10$dummyhash', 'Current User', 'This is my profile', 'https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser', false)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- POSTS (50 posts across different categories)
-- =====================================================

INSERT INTO posts (id, author_id, content, image_url, category, likes_count, comments_count, shares_count, saves_count, views_count, engagement_score, created_at, metadata)
VALUES
    -- Technology Posts
    ('aaaaaaaa-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'Breaking: Major tech company announces revolutionary AI breakthrough that could change everything we know about artificial intelligence. The new model shows unprecedented capabilities in reasoning and problem-solving.', 'https://picsum.photos/seed/tech1/800/400', 'Technology', 4521, 234, 189, 156, 45000, 95.5, NOW() - INTERVAL '2 hours', '{"hashtags": ["AI", "TechNews", "Innovation"]}'),
    ('aaaaaaaa-0002-0002-0002-000000000002', '11111111-1111-1111-1111-111111111111', 'Apple unveils new MacBook Pro with M4 chip - 50% faster than previous generation! The new laptops feature improved battery life and a stunning new display technology.', 'https://picsum.photos/seed/tech2/800/400', 'Technology', 3892, 187, 145, 234, 38000, 88.2, NOW() - INTERVAL '5 hours', '{"hashtags": ["Apple", "MacBook", "M4"]}'),
    ('aaaaaaaa-0003-0003-0003-000000000003', '88888888-8888-8888-8888-888888888888', 'Just tested the new VR headset from Meta - mind blown! 🤯 The resolution is incredible and the hand tracking is finally where it needs to be. Full review coming soon!', 'https://picsum.photos/seed/tech3/800/400', 'Technology', 2156, 98, 67, 89, 21000, 72.4, NOW() - INTERVAL '8 hours', '{"hashtags": ["VR", "Meta", "TechReview"]}'),
    ('aaaaaaaa-0004-0004-0004-000000000004', '11111111-1111-1111-1111-111111111111', 'OpenAI releases GPT-5 with multimodal capabilities - can now process video, audio, and text simultaneously. This is a game-changer for content creation and analysis.', 'https://picsum.photos/seed/tech4/800/400', 'Technology', 5234, 312, 256, 178, 52000, 97.8, NOW() - INTERVAL '12 hours', '{"hashtags": ["OpenAI", "GPT5", "AI"]}'),
    ('aaaaaaaa-0005-0005-0005-000000000005', '66666666-6666-6666-6666-666666666666', 'Been working on a new open-source project - a real-time collaboration tool built with WebRTC. Check it out on GitHub! Feedback welcome 🚀', NULL, 'Technology', 456, 34, 23, 45, 4500, 45.2, NOW() - INTERVAL '1 day', '{"hashtags": ["OpenSource", "WebRTC", "Coding"]}'),

    -- Sports Posts
    ('bbbbbbbb-0001-0001-0001-000000000001', '22222222-2222-2222-2222-222222222222', 'Championship game ends in dramatic overtime victory! The crowd goes wild as the underdog team clinches their first title in 25 years. What an incredible season!', 'https://picsum.photos/seed/sports1/800/400', 'Sports', 8934, 567, 423, 234, 89000, 98.9, NOW() - INTERVAL '3 hours', '{"hashtags": ["Championship", "Sports", "Victory"]}'),
    ('bbbbbbbb-0002-0002-0002-000000000002', '22222222-2222-2222-2222-222222222222', 'Transfer news: Star striker signs record-breaking $200M deal! This is the biggest transfer in football history. Full details inside.', 'https://picsum.photos/seed/sports2/800/400', 'Sports', 6723, 445, 312, 178, 67000, 92.3, NOW() - INTERVAL '6 hours', '{"hashtags": ["Transfer", "Football", "Record"]}'),
    ('bbbbbbbb-0003-0003-0003-000000000003', '22222222-2222-2222-2222-222222222222', 'Olympics 2028 venue revealed! Los Angeles prepares for the biggest sporting event with new state-of-the-art facilities and sustainable infrastructure.', 'https://picsum.photos/seed/sports3/800/400', 'Sports', 4567, 234, 189, 145, 45000, 85.6, NOW() - INTERVAL '1 day', '{"hashtags": ["Olympics", "LA2028", "Sports"]}'),

    -- Finance Posts
    ('cccccccc-0001-0001-0001-000000000001', '33333333-3333-3333-3333-333333333333', 'Stock markets reach all-time highs amid positive economic indicators! S&P 500 closes above 5,500 for the first time. Here''s what analysts are saying.', 'https://picsum.photos/seed/finance1/800/400', 'Finance', 3456, 189, 145, 234, 34000, 82.4, NOW() - INTERVAL '4 hours', '{"hashtags": ["Stocks", "Markets", "Economy"]}'),
    ('cccccccc-0002-0002-0002-000000000002', '33333333-3333-3333-3333-333333333333', 'Federal Reserve announces interest rate decision - markets react! The central bank hints at potential cuts later this year. Full analysis in thread.', 'https://picsum.photos/seed/finance2/800/400', 'Finance', 2890, 156, 98, 167, 29000, 75.8, NOW() - INTERVAL '7 hours', '{"hashtags": ["FederalReserve", "InterestRates", "Economy"]}'),
    ('cccccccc-0003-0003-0003-000000000003', '33333333-3333-3333-3333-333333333333', 'Top 5 investment strategies for 2026 - don''t miss these opportunities! From AI stocks to renewable energy, here''s where smart money is going.', NULL, 'Finance', 1567, 89, 67, 145, 15000, 65.3, NOW() - INTERVAL '2 days', '{"hashtags": ["Investing", "Strategies", "Finance"]}'),

    -- Health Posts
    ('dddddddd-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 'New study reveals surprising health benefits of daily walking - just 30 minutes can reduce heart disease risk by 40%! Start your walking routine today.', 'https://picsum.photos/seed/health1/800/400', 'Health', 4567, 234, 189, 312, 45000, 87.6, NOW() - INTERVAL '5 hours', '{"hashtags": ["Health", "Walking", "Fitness"]}'),
    ('dddddddd-0002-0002-0002-000000000002', '44444444-4444-4444-4444-444444444444', 'Scientists discover potential breakthrough in cancer treatment - early trials show promising results with minimal side effects. Hope on the horizon!', 'https://picsum.photos/seed/health2/800/400', 'Health', 7890, 456, 345, 278, 78000, 95.4, NOW() - INTERVAL '10 hours', '{"hashtags": ["Cancer", "Research", "Health"]}'),
    ('dddddddd-0003-0003-0003-000000000003', '44444444-4444-4444-4444-444444444444', '5 superfoods you should add to your diet in 2026 🥑🫐 These nutrient-packed foods can boost your immune system and energy levels naturally.', 'https://picsum.photos/seed/health3/800/400', 'Health', 2345, 123, 89, 178, 23000, 68.9, NOW() - INTERVAL '1 day', '{"hashtags": ["Superfoods", "Nutrition", "Health"]}'),

    -- Travel Posts
    ('eeeeeeee-0001-0001-0001-000000000001', '55555555-5555-5555-5555-555555555555', 'Travel industry sees unprecedented recovery in post-pandemic era! Airlines report record bookings for summer 2026. Where are you traveling next?', 'https://picsum.photos/seed/travel1/800/400', 'Travel', 3456, 189, 145, 234, 34000, 82.3, NOW() - INTERVAL '6 hours', '{"hashtags": ["Travel", "Tourism", "Summer"]}'),
    ('eeeeeeee-0002-0002-0002-000000000002', '55555555-5555-5555-5555-555555555555', 'Hidden gems of Southeast Asia - 10 destinations you''ve never heard of but NEED to visit! From pristine beaches to ancient temples. 🏝️🛕', 'https://picsum.photos/seed/travel2/800/400', 'Travel', 5678, 312, 234, 345, 56000, 91.2, NOW() - INTERVAL '12 hours', '{"hashtags": ["Asia", "Travel", "Adventure"]}'),
    ('eeeeeeee-0003-0003-0003-000000000003', '77777777-7777-7777-7777-777777777777', 'Just got back from Iceland - the Northern Lights were absolutely magical! ✨ Here are my top photography tips for capturing the aurora.', 'https://picsum.photos/seed/travel3/800/400', 'Travel', 4123, 234, 178, 289, 41000, 86.7, NOW() - INTERVAL '2 days', '{"hashtags": ["Iceland", "NorthernLights", "Photography"]}'),

    -- Science Posts
    ('ffffffff-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'NASA confirms exciting new mission to explore distant planets! The Artemis program expands with plans for first human Mars landing by 2035.', 'https://picsum.photos/seed/science1/800/400', 'Science', 6789, 389, 289, 345, 67000, 93.4, NOW() - INTERVAL '8 hours', '{"hashtags": ["NASA", "Mars", "Space"]}'),
    ('ffffffff-0002-0002-0002-000000000002', '11111111-1111-1111-1111-111111111111', 'Scientists discover New species in deep ocean exploration mission - over 50 previously unknown creatures found at depths below 6,000 meters!', 'https://picsum.photos/seed/science2/800/400', 'Science', 4567, 234, 189, 267, 45000, 85.8, NOW() - INTERVAL '1 day', '{"hashtags": ["Ocean", "Discovery", "Science"]}'),

    -- Entertainment Posts
    ('11111111-0001-0001-0001-000000000001', '77777777-7777-7777-7777-777777777777', 'Movie reviews are in - this year''s sci-fi blockbuster exceeds all expectations! Critics call it "the best space opera since Interstellar" 🎬🌟', 'https://picsum.photos/seed/movie1/800/400', 'Entertainment', 3456, 189, 145, 178, 34000, 79.5, NOW() - INTERVAL '9 hours', '{"hashtags": ["Movies", "SciFi", "Review"]}'),
    ('11111111-0002-0002-0002-000000000002', '77777777-7777-7777-7777-777777777777', 'Grammy nominations announced - major surprises and snubs! Here''s the complete list of nominees for the 2026 awards ceremony.', 'https://picsum.photos/seed/music1/800/400', 'Entertainment', 5678, 345, 256, 234, 56000, 89.3, NOW() - INTERVAL '15 hours', '{"hashtags": ["Grammys", "Music", "Awards"]}'),

    -- Crypto Posts
    ('22222222-0001-0001-0001-000000000001', '33333333-3333-3333-3333-333333333333', 'Cryptocurrency market shows signs of major shift - Bitcoin breaks $100K! Institutional investors continue accumulating. Is this the start of a new bull run?', 'https://picsum.photos/seed/crypto1/800/400', 'Crypto', 4567, 278, 198, 234, 45000, 86.7, NOW() - INTERVAL '4 hours', '{"hashtags": ["Bitcoin", "Crypto", "Investment"]}'),
    ('22222222-0002-0002-0002-000000000002', '88888888-8888-8888-8888-888888888888', 'Ethereum 3.0 upgrade complete - gas fees drop 90%! This is huge for DeFi and NFT ecosystems. Here''s what changed and what it means for users.', 'https://picsum.photos/seed/crypto2/800/400', 'Crypto', 3456, 198, 145, 189, 34000, 81.2, NOW() - INTERVAL '11 hours', '{"hashtags": ["Ethereum", "DeFi", "Crypto"]}'),

    -- Food Posts
    ('33333333-0001-0001-0001-000000000001', '66666666-6666-6666-6666-666666666666', 'Just tried this amazing ramen place downtown - the broth is perfection! 🍜 Definitely worth the 2-hour wait. Who else loves authentic Japanese food?', 'https://picsum.photos/seed/food1/800/400', 'Food', 2345, 145, 89, 167, 23000, 71.3, NOW() - INTERVAL '7 hours', '{"hashtags": ["Ramen", "Food", "Japanese"]}'),
    ('33333333-0002-0002-0002-000000000002', '77777777-7777-7777-7777-777777777777', 'Homemade sourdough bread recipe - finally nailed it after 6 months of trying! 🍞 Sharing my tips for the perfect crust and crumb.', 'https://picsum.photos/seed/food2/800/400', 'Food', 1890, 98, 67, 145, 18000, 62.8, NOW() - INTERVAL '2 days', '{"hashtags": ["Sourdough", "Baking", "Homemade"]}'),

    -- General/Misc Posts
    ('44444444-0001-0001-0001-000000000001', '66666666-6666-6666-6666-666666666666', 'Productivity tip of the day: Try the Pomodoro Technique! Work for 25 minutes, break for 5. My productivity has increased 40% since I started using this method.', NULL, 'General', 1234, 78, 45, 89, 12000, 55.6, NOW() - INTERVAL '1 day', '{"hashtags": ["Productivity", "Tips", "Work"]}'),
    ('44444444-0002-0002-0002-000000000002', '88888888-8888-8888-8888-888888888888', 'What an amazing sunset today! 🌅 Sometimes you just need to stop and appreciate the beauty around us. Take a moment to breathe.', 'https://picsum.photos/seed/sunset1/800/400', 'General', 2567, 134, 89, 178, 25000, 72.4, NOW() - INTERVAL '3 hours', '{"hashtags": ["Sunset", "Nature", "Mindfulness"]}'),

    -- More Tech posts for variety
    ('aaaaaaaa-0006-0006-0006-000000000006', '88888888-8888-8888-8888-888888888888', 'Samsung Galaxy S26 review is live! 📱 Best camera system yet with revolutionary AI photo enhancement. Is it worth the upgrade? Full breakdown in thread.', 'https://picsum.photos/seed/phone1/800/400', 'Technology', 2890, 156, 98, 145, 29000, 75.4, NOW() - INTERVAL '14 hours', '{"hashtags": ["Samsung", "Galaxy", "Review"]}'),
    ('aaaaaaaa-0007-0007-0007-000000000007', '11111111-1111-1111-1111-111111111111', 'Google announces Quantum Computing milestone - 1000 qubit processor achieved! This could revolutionize drug discovery and climate modeling.', 'https://picsum.photos/seed/quantum1/800/400', 'Technology', 4123, 234, 178, 212, 41000, 84.6, NOW() - INTERVAL '18 hours', '{"hashtags": ["Quantum", "Google", "Computing"]}'),
    ('aaaaaaaa-0008-0008-0008-000000000008', '66666666-6666-6666-6666-666666666666', 'Just deployed my first serverless application on AWS Lambda! The learning curve was steep but so worth it. Happy to share my learnings with anyone interested.', NULL, 'Technology', 567, 45, 23, 56, 5600, 42.3, NOW() - INTERVAL '2 days', '{"hashtags": ["AWS", "Serverless", "Cloud"]}'),

    -- More varied posts
    ('55555555-0001-0001-0001-000000000001', '55555555-5555-5555-5555-555555555555', 'Digital nomad life update: Working from Bali this month! 🌴 The coworking spaces here are amazing and the cost of living is unbeatable. AMA about remote work!', 'https://picsum.photos/seed/bali1/800/400', 'Travel', 3456, 198, 145, 234, 34000, 82.1, NOW() - INTERVAL '16 hours', '{"hashtags": ["DigitalNomad", "Bali", "RemoteWork"]}'),
    ('55555555-0002-0002-0002-000000000002', '22222222-2222-2222-2222-222222222222', 'Breaking: New sports streaming platform launches with 4K/HDR support and multi-view feature! No more missing the action. Full details inside.', 'https://picsum.photos/seed/streaming1/800/400', 'Sports', 2345, 134, 89, 156, 23000, 71.8, NOW() - INTERVAL '20 hours', '{"hashtags": ["Streaming", "Sports", "4K"]}'),
    ('55555555-0003-0003-0003-000000000003', '44444444-4444-4444-4444-444444444444', 'Mental health matters! 💚 Here are 10 simple daily habits that can significantly improve your mental well-being. Thread below with details.', 'https://picsum.photos/seed/mental1/800/400', 'Health', 5678, 312, 234, 345, 56000, 90.5, NOW() - INTERVAL '1 day', '{"hashtags": ["MentalHealth", "Wellness", "SelfCare"]}'),

    -- Additional posts to reach 50
    ('66666666-0001-0001-0001-000000000001', '33333333-3333-3333-3333-333333333333', 'Real estate market update: Housing prices stabilize after 2-year surge. First-time buyers may finally have their chance. Full market analysis inside.', 'https://picsum.photos/seed/realestate1/800/400', 'Finance', 2345, 134, 89, 167, 23000, 71.2, NOW() - INTERVAL '22 hours', '{"hashtags": ["RealEstate", "Housing", "Market"]}'),
    ('66666666-0002-0002-0002-000000000002', '55555555-5555-5555-5555-555555555555', 'Japan travel guide 2026: Everything you need to know about visiting after the new tourism policies. Tips for budget travelers included! 🇯🇵', 'https://picsum.photos/seed/japan1/800/400', 'Travel', 4567, 256, 178, 289, 45000, 86.4, NOW() - INTERVAL '1 day', '{"hashtags": ["Japan", "Travel", "Guide"]}'),
    ('66666666-0003-0003-0003-000000000003', '22222222-2222-2222-2222-222222222222', 'F1 season preview: New regulations shake up the grid! Which team has the best chance at the championship? My predictions inside. 🏎️', 'https://picsum.photos/seed/f1-1/800/400', 'Sports', 3890, 212, 156, 198, 38000, 83.5, NOW() - INTERVAL '3 days', '{"hashtags": ["F1", "Racing", "Sports"]}'),
    ('77777777-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'Cybersecurity alert: New phishing campaign targets millions - here''s how to protect yourself. Share this with your friends and family!', 'https://picsum.photos/seed/security1/800/400', 'Technology', 6789, 389, 312, 234, 67000, 93.2, NOW() - INTERVAL '26 hours', '{"hashtags": ["Cybersecurity", "Phishing", "Safety"]}'),
    ('77777777-0002-0002-0002-000000000002', '44444444-4444-4444-4444-444444444444', 'Sleep better tonight! 😴 Research-backed tips for improving your sleep quality. Spoiler: Put away your phone 1 hour before bed!', 'https://picsum.photos/seed/sleep1/800/400', 'Health', 3456, 189, 145, 234, 34000, 81.7, NOW() - INTERVAL '28 hours', '{"hashtags": ["Sleep", "Health", "Wellness"]}'),
    ('77777777-0003-0003-0003-000000000003', '88888888-8888-8888-8888-888888888888', 'New coding bootcamp vs traditional CS degree - which is better in 2026? Based on my hiring experience, here''s what really matters.', NULL, 'Technology', 2890, 234, 156, 178, 29000, 76.8, NOW() - INTERVAL '30 hours', '{"hashtags": ["Coding", "Career", "Tech"]}'),
    ('88888888-0001-0001-0001-000000000001', '77777777-7777-7777-7777-777777777777', 'Street photography tips from my 10 years of experience 📸 Thread of my best shots and the stories behind them.', 'https://picsum.photos/seed/photo1/800/400', 'Entertainment', 2345, 145, 98, 189, 23000, 72.6, NOW() - INTERVAL '32 hours', '{"hashtags": ["Photography", "StreetPhoto", "Art"]}'),
    ('88888888-0002-0002-0002-000000000002', '66666666-6666-6666-6666-666666666666', 'Work-life balance is not a myth! Here''s how I manage a demanding tech job while still having time for hobbies and family. It''s all about boundaries.', NULL, 'General', 1890, 123, 78, 145, 18000, 64.5, NOW() - INTERVAL '2 days', '{"hashtags": ["WorkLife", "Balance", "Career"]}'),
    ('99999999-0001-0001-0001-000000000001', '33333333-3333-3333-3333-333333333333', 'Startup funding hits new record in Q1 2026! AI and cleantech lead the way. Full breakdown of the hottest sectors for investment.', 'https://picsum.photos/seed/startup1/800/400', 'Finance', 2567, 156, 112, 178, 25000, 74.3, NOW() - INTERVAL '36 hours', '{"hashtags": ["Startups", "Funding", "VC"]}'),
    ('99999999-0002-0002-0002-000000000002', '55555555-5555-5555-5555-555555555555', 'Solo travel safety guide for women - 15 essential tips from my 5 years of solo adventures. You CAN see the world safely! 🌍✨', 'https://picsum.photos/seed/solo1/800/400', 'Travel', 5678, 345, 267, 312, 56000, 91.4, NOW() - INTERVAL '38 hours', '{"hashtags": ["SoloTravel", "Women", "Safety"]}'),
    ('99999999-0003-0003-0003-000000000003', '22222222-2222-2222-2222-222222222222', 'Documentary of the year! This sports film had me in tears. A story of perseverance, teamwork, and never giving up. Must watch! 🎬', 'https://picsum.photos/seed/doc1/800/400', 'Entertainment', 3456, 198, 145, 223, 34000, 82.8, NOW() - INTERVAL '40 hours', '{"hashtags": ["Documentary", "Sports", "Film"]}'),
    ('aaaaaaaa-0009-0009-0009-000000000009', '88888888-8888-8888-8888-888888888888', 'Home automation in 2026: My complete smart home setup using Matter protocol. Finally, everything works together seamlessly! 🏠', 'https://picsum.photos/seed/smarthome1/800/400', 'Technology', 2345, 145, 89, 167, 23000, 71.5, NOW() - INTERVAL '42 hours', '{"hashtags": ["SmartHome", "IoT", "Matter"]}'),
    ('aaaaaaaa-0010-0010-0010-000000000010', '11111111-1111-1111-1111-111111111111', 'Breaking: Major social media platform announces end-to-end encryption for all messages. Privacy advocates celebrate this long-awaited move.', 'https://picsum.photos/seed/privacy1/800/400', 'Technology', 4567, 278, 198, 234, 45000, 86.9, NOW() - INTERVAL '44 hours', '{"hashtags": ["Privacy", "Encryption", "Tech"]}')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- COMMENTS (Multiple comments per post)
-- =====================================================

-- Comments for Tech post 1 (AI breakthrough)
INSERT INTO comments (id, post_id, author_id, content, likes_count, replies_count, depth, created_at)
VALUES
    ('c0000001-0001-0001-0001-000000000001', 'aaaaaaaa-0001-0001-0001-000000000001', '66666666-6666-6666-6666-666666666666', 'This is absolutely amazing! Been waiting for this kind of breakthrough. The implications for healthcare alone are mind-boggling.', 145, 3, 0, NOW() - INTERVAL '1 hour'),
    ('c0000001-0002-0001-0001-000000000001', 'aaaaaaaa-0001-0001-0001-000000000001', '77777777-7777-7777-7777-777777777777', 'I have been following this for a while, great update! Can''t wait to see how this affects creative industries.', 89, 1, 0, NOW() - INTERVAL '1 hour 30 minutes'),
    ('c0000001-0003-0001-0001-000000000001', 'aaaaaaaa-0001-0001-0001-000000000001', '88888888-8888-8888-8888-888888888888', 'As someone who works in AI, I can confirm this is huge. The reasoning capabilities are unlike anything we''ve seen before.', 234, 2, 0, NOW() - INTERVAL '45 minutes'),
    ('c0000001-0004-0001-0001-000000000001', 'aaaaaaaa-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 'Interesting perspective, but I worry about the ethical implications. We need proper regulations first.', 67, 1, 0, NOW() - INTERVAL '30 minutes')
ON CONFLICT (id) DO NOTHING;

-- Replies to first comment
INSERT INTO comments (id, post_id, author_id, parent_id, content, likes_count, depth, created_at)
VALUES
    ('c0000001-0001-0001-0001-aaa000000001', 'aaaaaaaa-0001-0001-0001-000000000001', '88888888-8888-8888-8888-888888888888', 'c0000001-0001-0001-0001-000000000001', 'Totally agree! Healthcare applications could save millions of lives.', 45, 1, NOW() - INTERVAL '50 minutes'),
    ('c0000001-0001-0001-0001-aaa000000002', 'aaaaaaaa-0001-0001-0001-000000000001', '77777777-7777-7777-7777-777777777777', 'c0000001-0001-0001-0001-000000000001', 'The drug discovery potential alone is incredible. Imagine cutting R&D time by 80%!', 34, 1, NOW() - INTERVAL '40 minutes'),
    ('c0000001-0001-0001-0001-aaa000000003', 'aaaaaaaa-0001-0001-0001-000000000001', '66666666-6666-6666-6666-666666666666', 'c0000001-0001-0001-0001-000000000001', 'Thanks for the support! Let''s see how this develops in the coming months.', 23, 1, NOW() - INTERVAL '35 minutes')
ON CONFLICT (id) DO NOTHING;

-- Comments for Sports post 1 (Championship)
INSERT INTO comments (id, post_id, author_id, content, likes_count, replies_count, depth, created_at)
VALUES
    ('c0000002-0001-0001-0001-000000000001', 'bbbbbbbb-0001-0001-0001-000000000001', '66666666-6666-6666-6666-666666666666', 'What an incredible game! I was on the edge of my seat the entire overtime. Sports at its finest! 🏆', 234, 2, 0, NOW() - INTERVAL '2 hours'),
    ('c0000002-0002-0001-0001-000000000001', 'bbbbbbbb-0001-0001-0001-000000000001', '77777777-7777-7777-7777-777777777777', 'Finally! They deserved this win after such a tough season. The dedication paid off.', 156, 1, 0, NOW() - INTERVAL '2 hours 15 minutes'),
    ('c0000002-0003-0001-0001-000000000001', 'bbbbbbbb-0001-0001-0001-000000000001', '88888888-8888-8888-8888-888888888888', 'I had tears in my eyes watching this. Sports really brings people together.', 189, 0, 0, NOW() - INTERVAL '2 hours 30 minutes')
ON CONFLICT (id) DO NOTHING;

-- Replies for sports comment
INSERT INTO comments (id, post_id, author_id, parent_id, content, likes_count, depth, created_at)
VALUES
    ('c0000002-0001-0001-0001-aaa000000001', 'bbbbbbbb-0001-0001-0001-000000000001', '88888888-8888-8888-8888-888888888888', 'c0000002-0001-0001-0001-000000000001', 'Same here! My whole family was watching together. Unforgettable moment!', 67, 1, NOW() - INTERVAL '1 hour 45 minutes'),
    ('c0000002-0001-0001-0001-aaa000000002', 'bbbbbbbb-0001-0001-0001-000000000001', '66666666-6666-6666-6666-666666666666', 'c0000002-0001-0001-0001-000000000001', 'These are the moments that make sports so special!', 45, 1, NOW() - INTERVAL '1 hour 30 minutes')
ON CONFLICT (id) DO NOTHING;

-- Comments for Finance post (Stock markets)
INSERT INTO comments (id, post_id, author_id, content, likes_count, replies_count, depth, created_at)
VALUES
    ('c0000003-0001-0001-0001-000000000001', 'cccccccc-0001-0001-0001-000000000001', '88888888-8888-8888-8888-888888888888', 'Great analysis! I''ve been dollar-cost averaging for years and it''s finally paying off.', 89, 1, 0, NOW() - INTERVAL '3 hours'),
    ('c0000003-0002-0001-0001-000000000001', 'cccccccc-0001-0001-0001-000000000001', '66666666-6666-6666-6666-666666666666', 'Should I invest now or wait for a pullback? Always hard to time the market.', 67, 2, 0, NOW() - INTERVAL '3 hours 20 minutes'),
    ('c0000003-0003-0001-0001-000000000001', 'cccccccc-0001-0001-0001-000000000001', '77777777-7777-7777-7777-777777777777', 'Remember folks - past performance doesn''t guarantee future results. Invest wisely!', 123, 0, 0, NOW() - INTERVAL '3 hours 40 minutes')
ON CONFLICT (id) DO NOTHING;

-- Replies for finance comment
INSERT INTO comments (id, post_id, author_id, parent_id, content, likes_count, depth, created_at)
VALUES
    ('c0000003-0002-0001-0001-aaa000000001', 'cccccccc-0001-0001-0001-000000000001', '33333333-3333-3333-3333-333333333333', 'c0000003-0002-0001-0001-000000000001', 'Time in the market beats timing the market. Just start with what you can afford!', 78, 1, NOW() - INTERVAL '3 hours'),
    ('c0000003-0002-0001-0001-aaa000000002', 'cccccccc-0001-0001-0001-000000000001', '88888888-8888-8888-8888-888888888888', 'c0000003-0002-0001-0001-000000000001', 'Consider index funds if you''re unsure. Low fees and diversification built-in.', 56, 1, NOW() - INTERVAL '2 hours 50 minutes')
ON CONFLICT (id) DO NOTHING;

-- Comments for Health post (Walking benefits)
INSERT INTO comments (id, post_id, author_id, content, likes_count, replies_count, depth, created_at)
VALUES
    ('c0000004-0001-0001-0001-000000000001', 'dddddddd-0001-0001-0001-000000000001', '77777777-7777-7777-7777-777777777777', 'Started walking 10,000 steps daily 6 months ago. Lost 15 pounds and feel amazing!', 234, 2, 0, NOW() - INTERVAL '4 hours'),
    ('c0000004-0002-0001-0001-000000000001', 'dddddddd-0001-0001-0001-000000000001', '66666666-6666-6666-6666-666666666666', 'Walking is so underrated. It''s free, easy, and the health benefits are enormous.', 145, 1, 0, NOW() - INTERVAL '4 hours 20 minutes'),
    ('c0000004-0003-0001-0001-000000000001', 'dddddddd-0001-0001-0001-000000000001', '88888888-8888-8888-8888-888888888888', 'I walk to work now instead of driving. Best decision I ever made for my health!', 178, 0, 0, NOW() - INTERVAL '4 hours 40 minutes')
ON CONFLICT (id) DO NOTHING;

-- Replies for health comment
INSERT INTO comments (id, post_id, author_id, parent_id, content, likes_count, depth, created_at)
VALUES
    ('c0000004-0001-0001-0001-aaa000000001', 'dddddddd-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 'c0000004-0001-0001-0001-000000000001', 'That''s incredible progress! Keep it up! 💪', 56, 1, NOW() - INTERVAL '3 hours 45 minutes'),
    ('c0000004-0001-0001-0001-aaa000000002', 'dddddddd-0001-0001-0001-000000000001', '66666666-6666-6666-6666-666666666666', 'c0000004-0001-0001-0001-000000000001', 'Any tips for staying motivated during bad weather?', 34, 1, NOW() - INTERVAL '3 hours 30 minutes')
ON CONFLICT (id) DO NOTHING;

-- Comments for Travel post (Southeast Asia)
INSERT INTO comments (id, post_id, author_id, content, likes_count, replies_count, depth, created_at)
VALUES
    ('c0000005-0001-0001-0001-000000000001', 'eeeeeeee-0002-0002-0002-000000000002', '66666666-6666-6666-6666-666666666666', 'Adding all of these to my bucket list! Southeast Asia has been on my radar for years.', 167, 1, 0, NOW() - INTERVAL '10 hours'),
    ('c0000005-0002-0001-0001-000000000001', 'eeeeeeee-0002-0002-0002-000000000002', '77777777-7777-7777-7777-777777777777', 'Visited Thailand last year - absolutely life-changing experience. Can''t wait to explore more!', 145, 0, 0, NOW() - INTERVAL '10 hours 30 minutes'),
    ('c0000005-0003-0001-0001-000000000001', 'eeeeeeee-0002-0002-0002-000000000002', '88888888-8888-8888-8888-888888888888', 'What''s the best time of year to visit? Trying to avoid monsoon season.', 89, 1, 0, NOW() - INTERVAL '11 hours')
ON CONFLICT (id) DO NOTHING;

-- Reply for travel comment
INSERT INTO comments (id, post_id, author_id, parent_id, content, likes_count, depth, created_at)
VALUES
    ('c0000005-0003-0001-0001-aaa000000001', 'eeeeeeee-0002-0002-0002-000000000002', '55555555-5555-5555-5555-555555555555', 'c0000005-0003-0001-0001-000000000001', 'November to February is ideal for most of Southeast Asia. Dry season with comfortable temperatures!', 78, 1, NOW() - INTERVAL '10 hours 30 minutes')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- USER INTERACTIONS (Likes, Pins, Saves)
-- =====================================================

-- Post Likes (current user likes some posts)
INSERT INTO post_likes (id, user_id, post_id, created_at)
VALUES
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'aaaaaaaa-0001-0001-0001-000000000001', NOW() - INTERVAL '1 hour'),
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'bbbbbbbb-0001-0001-0001-000000000001', NOW() - INTERVAL '2 hours'),
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'eeeeeeee-0002-0002-0002-000000000002', NOW() - INTERVAL '3 hours'),
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'dddddddd-0001-0001-0001-000000000001', NOW() - INTERVAL '4 hours'),
    (uuid_generate_v4(), '66666666-6666-6666-6666-666666666666', 'aaaaaaaa-0001-0001-0001-000000000001', NOW() - INTERVAL '30 minutes'),
    (uuid_generate_v4(), '77777777-7777-7777-7777-777777777777', 'aaaaaaaa-0001-0001-0001-000000000001', NOW() - INTERVAL '45 minutes'),
    (uuid_generate_v4(), '88888888-8888-8888-8888-888888888888', 'bbbbbbbb-0001-0001-0001-000000000001', NOW() - INTERVAL '1 hour 30 minutes')
ON CONFLICT (user_id, post_id) DO NOTHING;

-- Post Pins (current user pins some posts)
INSERT INTO post_pins (id, user_id, post_id, created_at)
VALUES
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'aaaaaaaa-0004-0004-0004-000000000004', NOW() - INTERVAL '5 hours'),
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'ffffffff-0001-0001-0001-000000000001', NOW() - INTERVAL '6 hours')
ON CONFLICT (user_id, post_id) DO NOTHING;

-- Post Saves (current user saves some posts)
INSERT INTO post_saves (id, user_id, post_id, collection_name, created_at)
VALUES
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'cccccccc-0001-0001-0001-000000000001', 'Finance', NOW() - INTERVAL '7 hours'),
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'aaaaaaaa-0002-0002-0002-000000000002', 'Tech', NOW() - INTERVAL '8 hours'),
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'eeeeeeee-0002-0002-0002-000000000002', 'Travel', NOW() - INTERVAL '9 hours'),
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'dddddddd-0002-0002-0002-000000000002', 'Health', NOW() - INTERVAL '10 hours')
ON CONFLICT (user_id, post_id) DO NOTHING;

-- Comment Likes
INSERT INTO comment_likes (id, user_id, comment_id, created_at)
VALUES
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'c0000001-0001-0001-0001-000000000001', NOW() - INTERVAL '1 hour'),
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'c0000001-0003-0001-0001-000000000001', NOW() - INTERVAL '2 hours'),
    (uuid_generate_v4(), '66666666-6666-6666-6666-666666666666', 'c0000001-0003-0001-0001-000000000001', NOW() - INTERVAL '30 minutes')
ON CONFLICT (user_id, comment_id) DO NOTHING;

-- =====================================================
-- USER FOLLOWS
-- =====================================================

INSERT INTO user_follows (id, follower_id, following_id, created_at)
VALUES
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '30 days'),
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '25 days'),
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', NOW() - INTERVAL '20 days'),
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', '88888888-8888-8888-8888-888888888888', NOW() - INTERVAL '15 days'),
    (uuid_generate_v4(), '66666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '60 days'),
    (uuid_generate_v4(), '66666666-6666-6666-6666-666666666666', '88888888-8888-8888-8888-888888888888', NOW() - INTERVAL '45 days'),
    (uuid_generate_v4(), '77777777-7777-7777-7777-777777777777', '55555555-5555-5555-5555-555555555555', NOW() - INTERVAL '30 days')
ON CONFLICT (follower_id, following_id) DO NOTHING;

-- =====================================================
-- UPDATE COUNTS (Ensure consistency)
-- =====================================================

-- Update post comment counts
UPDATE posts p
SET comments_count = (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id AND c.is_deleted = false);

-- Update comment reply counts
UPDATE comments c
SET replies_count = (SELECT COUNT(*) FROM comments r WHERE r.parent_id = c.id AND r.is_deleted = false);

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE 'Database initialization complete!';
    RAISE NOTICE 'Created % users', (SELECT COUNT(*) FROM users);
    RAISE NOTICE 'Created % posts', (SELECT COUNT(*) FROM posts);
    RAISE NOTICE 'Created % comments', (SELECT COUNT(*) FROM comments);
END $$;
