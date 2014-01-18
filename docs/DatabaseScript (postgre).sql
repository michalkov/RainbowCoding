CREATE SEQUENCE jezyk_id_seq INCREMENT 1 START 1
;

CREATE TABLE jezyk ( 
	id bigint DEFAULT nextval(('jezyk_id_seq'::text)::regclass) NOT NULL,
	nazwa varchar(50) NOT NULL,
	opis varchar(255)
)
;

CREATE SEQUENCE notatka_id_seq INCREMENT 1 START 1
;

CREATE TABLE notatka ( 
	id bigint DEFAULT nextval(('notatka_id_seq'::text)::regclass) NOT NULL,
	id_plik bigint,
	tresc varchar(255) NOT NULL
)
;

CREATE SEQUENCE plik_id_seq INCREMENT 1 START 1
;

CREATE TABLE plik ( 
	id bigint DEFAULT nextval(('plik_id_seq'::text)::regclass) NOT NULL,
	id_jezyk bigint,
	id_projekt bigint,
	tresc text NOT NULL,
	pop_wersja text
)
;

CREATE SEQUENCE projekt_id_seq INCREMENT 1 START 1
;

CREATE TABLE projekt ( 
	id bigint DEFAULT nextval(('projekt_id_seq'::text)::regclass) NOT NULL,
	id_uzytkownik bigint,
	nazwa varchar(100) NOT NULL,
	opis varchar(255)
)
;

CREATE SEQUENCE rola_id_seq INCREMENT 1 START 1
;

CREATE TABLE rola ( 
	id bigint DEFAULT nextval(('rola_id_seq'::text)::regclass) NOT NULL,
	nazwa varchar(50) NOT NULL,
	opis varchar(255)
)
;

CREATE SEQUENCE uzytkownik_id_seq INCREMENT 1 START 1
;

CREATE TABLE uzytkownik ( 
	id bigint DEFAULT nextval(('uzytkownik_id_seq'::text)::regclass) NOT NULL,
	id_rola bigint,
	login varchar(50) NOT NULL,
	haslo varchar(50) NOT NULL
)
;


ALTER TABLE jezyk
	ADD CONSTRAINT uq_jezyk_nazwa UNIQUE (nazwa)
;
ALTER TABLE rola
	ADD CONSTRAINT uq_rola_nazwa UNIQUE (nazwa)
;
ALTER TABLE uzytkownik
	ADD CONSTRAINT uq_uzytkownik_login UNIQUE (login)
;
ALTER TABLE jezyk ADD CONSTRAINT pk_jezyk 
	PRIMARY KEY (id)
;


ALTER TABLE notatka ADD CONSTRAINT pk_notatka 
	PRIMARY KEY (id)
;


ALTER TABLE plik ADD CONSTRAINT pk_plik 
	PRIMARY KEY (id)
;


ALTER TABLE projekt ADD CONSTRAINT pk_projekt 
	PRIMARY KEY (id)
;


ALTER TABLE rola ADD CONSTRAINT pk_rola 
	PRIMARY KEY (id)
;


ALTER TABLE uzytkownik ADD CONSTRAINT pk_uzytkownik 
	PRIMARY KEY (id)
;




ALTER TABLE notatka ADD CONSTRAINT fk_notatka_plik 
	FOREIGN KEY (id_plik) REFERENCES plik (id)
;

ALTER TABLE plik ADD CONSTRAINT fk_plik_jezyk 
	FOREIGN KEY (id_jezyk) REFERENCES jezyk (id)
;

ALTER TABLE plik ADD CONSTRAINT fk_plik_projekt 
	FOREIGN KEY (id_projekt) REFERENCES projekt (id)
;

ALTER TABLE projekt ADD CONSTRAINT fk_projekt_uzytkownik 
	FOREIGN KEY (id_uzytkownik) REFERENCES uzytkownik (id)
;

ALTER TABLE uzytkownik ADD CONSTRAINT fk_uzytkownik_rola 
	FOREIGN KEY (id_rola) REFERENCES rola (id)
;
