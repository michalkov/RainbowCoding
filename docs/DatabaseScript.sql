CREATE TABLE JEZYK
(
	ID     NUMBER NOT NULL,
	NAZWA  VARCHAR2(50) NOT NULL,
	OPIS   VARCHAR2(255)
);

CREATE TABLE NOTATKA
(
	ID       NUMBER NOT NULL,
	ID_PLIK  NUMBER,
	TRESC    VARCHAR2(255) NOT NULL
);

CREATE TABLE PLIK
(
	ID          NUMBER NOT NULL,
	ID_JEZYK    NUMBER,
	ID_PROJEKT  NUMBER,
	TRESC       CLOB NOT NULL,
	POP_WERSJA  CLOB
);

CREATE TABLE PROJEKT
(
	ID             NUMBER NOT NULL,
	ID_UZYTKOWNIK  NUMBER,
	NAZWA          VARCHAR2(100) NOT NULL,
	OPIS           VARCHAR2(255)
);

CREATE TABLE ROLA
(
	ID     NUMBER NOT NULL,
	NAZWA  VARCHAR2(50) NOT NULL,
	OPIS   VARCHAR2(255)
);

CREATE TABLE UZYTKOWNIK
(
	ID       NUMBER NOT NULL,
	ID_ROLA  NUMBER,
	LOGIN    VARCHAR2(50) NOT NULL,
	HASLO    VARCHAR2(50) NOT NULL
);

ALTER TABLE JEZYK
	ADD CONSTRAINT UQ_JEZYK_NAZWA UNIQUE (NAZWA)
 USING INDEX;

ALTER TABLE ROLA
	ADD CONSTRAINT UQ_ROLA_NAZWA UNIQUE (NAZWA)
 USING INDEX;

ALTER TABLE UZYTKOWNIK
	ADD CONSTRAINT UQ_UZYTKOWNIK_LOGIN UNIQUE (LOGIN)
 USING INDEX;

ALTER TABLE JEZYK ADD CONSTRAINT PK_JEZYK 
	PRIMARY KEY (ID) 
 USING INDEX;

ALTER TABLE NOTATKA ADD CONSTRAINT PK_NOTATKA 
	PRIMARY KEY (ID) 
 USING INDEX;

ALTER TABLE PLIK ADD CONSTRAINT PK_PLIK 
	PRIMARY KEY (ID) 
 USING INDEX;

ALTER TABLE PROJEKT ADD CONSTRAINT PK_PROJEKT 
	PRIMARY KEY (ID) 
 USING INDEX;

ALTER TABLE ROLA ADD CONSTRAINT PK_ROLA 
	PRIMARY KEY (ID) 
 USING INDEX;

ALTER TABLE UZYTKOWNIK ADD CONSTRAINT PK_UZYTKOWNIK 
	PRIMARY KEY (ID) 
 USING INDEX;

ALTER TABLE NOTATKA ADD CONSTRAINT FK_NOTATKA_PLIK 
	FOREIGN KEY (ID_PLIK) REFERENCES PLIK (ID);

ALTER TABLE PLIK ADD CONSTRAINT FK_PLIK_JEZYK 
	FOREIGN KEY (ID_JEZYK) REFERENCES JEZYK (ID);

ALTER TABLE PLIK ADD CONSTRAINT FK_PLIK_PROJEKT 
	FOREIGN KEY (ID_PROJEKT) REFERENCES PROJEKT (ID);

ALTER TABLE PROJEKT ADD CONSTRAINT FK_PROJEKT_UZYTKOWNIK 
	FOREIGN KEY (ID_UZYTKOWNIK) REFERENCES UZYTKOWNIK (ID);

ALTER TABLE UZYTKOWNIK ADD CONSTRAINT FK_UZYTKOWNIK_ROLA 
	FOREIGN KEY (ID_ROLA) REFERENCES ROLA (ID);

CREATE SEQUENCE SEQ_JEZYK_ID 
    INCREMENT BY 1 
    START WITH 1 
    NOMAXVALUE 
    MINVALUE 1 
	NOCYCLE 
	NOCACHE 
	NOORDER
;

CREATE OR REPLACE TRIGGER TRG_JEZYK_ID 
	BEFORE INSERT 
	ON JEZYK 
	FOR EACH ROW 
	BEGIN 
		IF :NEW.ID IS NULL THEN
			SELECT SEQ_JEZYK_ID.NEXTVAL 
			INTO :NEW.ID 
			FROM DUAL;
		END IF; 
	END;
/

CREATE SEQUENCE SEQ_NOTATKA_ID 
    INCREMENT BY 1 
    START WITH 1 
    NOMAXVALUE 
    MINVALUE 1 
	NOCYCLE 
	NOCACHE 
	NOORDER
;

CREATE OR REPLACE TRIGGER TRG_NOTATKA_ID 
	BEFORE INSERT 
	ON NOTATKA 
	FOR EACH ROW 
	BEGIN 
		IF :NEW.ID IS NULL THEN
			SELECT SEQ_NOTATKA_ID.NEXTVAL 
			INTO :NEW.ID 
			FROM DUAL;
		END IF; 
	END;
/

CREATE SEQUENCE SEQ_PLIK_ID 
    INCREMENT BY 1 
    START WITH 1 
    NOMAXVALUE 
    MINVALUE 1 
	NOCYCLE 
	NOCACHE 
	NOORDER
;

CREATE OR REPLACE TRIGGER TRG_PLIK_ID 
	BEFORE INSERT 
	ON PLIK 
	FOR EACH ROW 
	BEGIN 
		IF :NEW.ID IS NULL THEN
			SELECT SEQ_PLIK_ID.NEXTVAL 
			INTO :NEW.ID 
			FROM DUAL;
		END IF; 
	END;
/

CREATE SEQUENCE SEQ_PROJEKT_ID 
    INCREMENT BY 1 
    START WITH 1 
    NOMAXVALUE 
    MINVALUE 1 
	NOCYCLE 
	NOCACHE 
	NOORDER
;

CREATE OR REPLACE TRIGGER TRG_PROJEKT_ID 
	BEFORE INSERT 
	ON PROJEKT 
	FOR EACH ROW 
	BEGIN 
		IF :NEW.ID IS NULL THEN
			SELECT SEQ_PROJEKT_ID.NEXTVAL 
			INTO :NEW.ID 
			FROM DUAL;
		END IF; 
	END;
/

CREATE SEQUENCE SEQ_ROLA_ID 
    INCREMENT BY 1 
    START WITH 1 
    NOMAXVALUE 
    MINVALUE 1 
	NOCYCLE 
	NOCACHE 
	NOORDER
;

CREATE OR REPLACE TRIGGER TRG_ROLA_ID 
	BEFORE INSERT 
	ON ROLA 
	FOR EACH ROW 
	BEGIN 
		IF :NEW.ID IS NULL THEN
			SELECT SEQ_ROLA_ID.NEXTVAL 
			INTO :NEW.ID 
			FROM DUAL;
		END IF; 
	END;
/

CREATE SEQUENCE SEQ_UZYTKOWNIK_ID 
    INCREMENT BY 1 
    START WITH 1 
    NOMAXVALUE 
    MINVALUE 1 
	NOCYCLE 
	NOCACHE 
	NOORDER
;

CREATE OR REPLACE TRIGGER TRG_UZYTKOWNIK_ID 
	BEFORE INSERT 
	ON UZYTKOWNIK 
	FOR EACH ROW 
	BEGIN 
		IF :NEW.ID IS NULL THEN
			SELECT SEQ_UZYTKOWNIK_ID.NEXTVAL 
			INTO :NEW.ID 
			FROM DUAL;
		END IF; 
	END;
/