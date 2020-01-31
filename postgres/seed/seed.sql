BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Jessie', 'jessie@gmail.com', 5, '2018-01-01');
INSERT into login (hash, email) values ('$2a$10$uqiXBFmsdZsGHCnt7DrVc.oBL2LtTF7Ln7emCEkNStoiaCxB2aBfW', 'jessie@gmail.com');

COMMIT;