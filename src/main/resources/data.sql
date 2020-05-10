INSERT IGNORE INTO security_question (id,question) VALUES (0,'What is your favourite place?');
INSERT IGNORE INTO security_question (id,question) VALUES (1,'What is your favourite animal?');
INSERT IGNORE INTO security_question (id,question) VALUES (2,'What is your favourite dictator?');
INSERT IGNORE INTO security_question (id,question) VALUES (3,'What is your favourite movie?');
INSERT IGNORE INTO user (id, answer1, answer2, created_at, password, rankings_points, login,username, question1_id, question2_id) VALUES (0, 'whale', 'The Hunger Games', '2020-03-20 20:25', 'saj3do$a', 7342, 'mike23','mike23', 1, 3);
INSERT IGNORE INTO user (id, answer1, answer2, created_at, password, rankings_points, login,username, question1_id, question2_id) VALUES (1, 'Capri', 'crocodile', '2020-03-20 16:08', 'ois5hefi#', 8129, 'tomHouston','tomHouston', 0, 1);
INSERT IGNORE INTO user (id, answer1, answer2, created_at, password, rankings_points, login,username, question1_id, question2_id) VALUES (2, 'Ice Age', 'Jamaica', '2020-03-21 08:35', 'ib1ui%sfbs4d', 4321, 'willDim','willDim', 3, 0);
INSERT IGNORE  INTO user (id, answer1, answer2, created_at, password, rankings_points, login,username, question1_id, question2_id) VALUES (3, 'lion', 'Shrek', '2020-03-22 10:45', 'ksn2dds6cs', 3845, 'giGinella','giGinella', 1, 3);
INSERT IGNORE INTO user (id, answer1, answer2, created_at, password, rankings_points, login,username, question1_id, question2_id) VALUES (4, 'Paris', 'koala', '2020-03-23 18:16', 'inf5sdds7s', 2982, 'paulAven','paulAven', 0, 1);
 INSERT IGNORE INTO user (id, answer1, answer2, created_at, password, rankings_points, login,username, question1_id, question2_id) VALUES (5, 'Florida', 'parrot', '2020-03-24 13:40', 'jnf2sd4ndd', 1549, 'SamFin','SamFin', 0, 1);

INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (0, '2020-03-20', '20:27:46', 20, 6455, 316, NULL, 0);
INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (1, '2020-03-20', '16:09:12', 26, 12364, 456, NULL, 1);
INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (2, '2020-03-21', '09:22:46', 9, 468, 80, NULL, 2);
 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (3, '2020-03-21', '09:30:04', 13, 1532, 153, NULL, 2);
 INSERT IGNORE  INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (4, '2020-03-21', '09:40:51', 16, 3164, 274, NULL, 2);
INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (5, '2020-03-21', '09:22:46', 20, 6496, 324, NULL, 2);
 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (6, '2020-03-21', '09:22:46', 23, 9413, 388, NULL, 2);
 
 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (7, '2020-03-22', '10:48:31', 5, 244, 48, NULL, 3);
 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (8, '2020-03-23', '18:17:22', 30, 19845, 649, NULL, 4);

INSERT IGNORE INTO multiplayer_game (id, bet, number_of_players, winner_id) VALUES (0, 450, 2, 1);
INSERT IGNORE INTO multiplayer_game (id, bet, number_of_players, winner_id) VALUES (1, 1249, 3, 4);
 INSERT IGNORE INTO multiplayer_game (id, bet, number_of_players, winner_id) VALUES (2, 976, 2, 0);
INSERT IGNORE INTO multiplayer_game (id, bet, number_of_players, winner_id) VALUES (3, 1564, 2, 2);
 INSERT IGNORE INTO multiplayer_game (id, bet, number_of_players, winner_id) VALUES (4, 1855, 2, 0);

 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (9, '2020-03-20', '21:15:21', 9, 784, 105, 0, 0);
 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (10, '2020-03-20', '21:15:21', 10, 1002, 120, 0, 1);
 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (11, '2020-03-23', '19:00:55', 12, 1448, 146, 1, 2);
 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (12, '2020-03-23', '19:00:55', 14, 1711, 187, 1, 3);
 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (13, '2020-03-23', '19:00:55', 18, 4915, 285, 1, 4);

 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (14, '2020-03-24', '11:15:47', 22, 7915, 368, 0, 0);
 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (15, '2020-03-24', '11:15:47', 21, 7687, 345, 0, 1);
 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (16, '2020-03-25', '15:32:25', 26, 16841, 438, 1, 2);
 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (17, '2020-03-25', '15:32:25', 24, 12647, 402, 1, 3);
 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (18, '2020-03-26', '17:50:00', 35, 32874, 854, 1, 4);
 INSERT IGNORE INTO game (id, date, game_time, level, score, score_lines, multiplayer_game_id, user_id) VALUES (19, '2020-03-26', '17:50:00', 45, 54497, 1504, 1, 0);
 
 INSERT IGNORE INTO friend_relation (id, status, receiver_user_id, sender_user_id) VALUES (0, 'Accepted', 1, 0);
 INSERT IGNORE INTO friend_relation (id, status, receiver_user_id, sender_user_id) VALUES (1, 'Accepted', 2, 0);
 INSERT IGNORE INTO friend_relation (id, status, receiver_user_id, sender_user_id) VALUES (2, 'Accepted', 3, 2);
 INSERT IGNORE INTO friend_relation (id, status, receiver_user_id, sender_user_id) VALUES (3, 'Accepted', 1, 2);
 INSERT IGNORE INTO friend_relation (id, status, receiver_user_id, sender_user_id) VALUES (4, 'Accepted', 2, 4);
 INSERT IGNORE INTO friend_relation (id, status, receiver_user_id, sender_user_id) VALUES (5, 'Accepted', 4, 3);


 INSERT IGNORE INTO friend_relation (id, status, receiver_user_id, sender_user_id) VALUES (6, 'Invited', 3, 1);
INSERT IGNORE INTO friend_relation (id, status, receiver_user_id, sender_user_id) VALUES (7, 'Invited', 0, 3);
 INSERT IGNORE INTO friend_relation (id, status, receiver_user_id, sender_user_id) VALUES (8, 'Invited', 4, 5);
 INSERT IGNORE INTO friend_relation (id, status, receiver_user_id, sender_user_id) VALUES (9, 'Invited', 1, 5);
 INSERT IGNORE INTO friend_relation (id, status, receiver_user_id, sender_user_id) VALUES (10, 'Denied', 2, 5);
 INSERT IGNORE INTO friend_relation (id, status, receiver_user_id, sender_user_id) VALUES (11, 'Denied', 4, 1);
 INSERT IGNORE INTO friend_relation (id, status, receiver_user_id, sender_user_id) VALUES (12, 'Denied', 5, 3);
