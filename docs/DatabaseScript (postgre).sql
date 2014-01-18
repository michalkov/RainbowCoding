DROP TABLE IF EXISTS file CASCADE
;
DROP SEQUENCE IF EXISTS file_id_seq
;
DROP TABLE IF EXISTS language CASCADE
;
DROP SEQUENCE IF EXISTS language_id_seq
;
DROP TABLE IF EXISTS note CASCADE
;
DROP SEQUENCE IF EXISTS note_id_seq
;
DROP TABLE IF EXISTS operator CASCADE
;
DROP SEQUENCE IF EXISTS operator_id_seq
;
DROP TABLE IF EXISTS project CASCADE
;
DROP SEQUENCE IF EXISTS project_id_seq
;
DROP TABLE IF EXISTS role CASCADE
;
DROP SEQUENCE IF EXISTS role_id_seq
;

CREATE SEQUENCE file_id_seq INCREMENT 1 START 1
;

CREATE TABLE file ( 
	id bigint DEFAULT nextval(('file_id_seq'::text)::regclass) NOT NULL,
	id_language bigint,
	id_project bigint,
	content text NOT NULL,
	prev_version text
)
;

CREATE SEQUENCE language_id_seq INCREMENT 1 START 1
;

CREATE TABLE language ( 
	id bigint DEFAULT nextval(('language_id_seq'::text)::regclass) NOT NULL,
	name varchar(50) NOT NULL,
	description varchar(255)
)
;

CREATE SEQUENCE note_id_seq INCREMENT 1 START 1
;

CREATE TABLE note ( 
	id bigint DEFAULT nextval(('note_id_seq'::text)::regclass) NOT NULL,
	id_file bigint,
	content varchar(255) NOT NULL
)
;

CREATE SEQUENCE operator_id_seq INCREMENT 1 START 1
;

CREATE TABLE operator ( 
	id bigint DEFAULT nextval(('operator_id_seq'::text)::regclass) NOT NULL,
	id_role bigint,
	login varchar(50) NOT NULL,
	password varchar(50) NOT NULL
)
;

CREATE SEQUENCE project_id_seq INCREMENT 1 START 1
;

CREATE TABLE project ( 
	id bigint DEFAULT nextval(('project_id_seq'::text)::regclass) NOT NULL,
	id_operator bigint,
	name varchar(100) NOT NULL,
	description varchar(255)
)
;

CREATE SEQUENCE role_id_seq INCREMENT 1 START 1
;

CREATE TABLE role ( 
	id bigint DEFAULT nextval(('role_id_seq'::text)::regclass) NOT NULL,
	name varchar(50) NOT NULL,
	description varchar(255)
)
;


ALTER TABLE language
	ADD CONSTRAINT uq_language_name UNIQUE (name)
;
ALTER TABLE operator
	ADD CONSTRAINT uq_operator_login UNIQUE (login)
;
ALTER TABLE role
	ADD CONSTRAINT uq_role_name UNIQUE (name)
;
ALTER TABLE file ADD CONSTRAINT pk_file 
	PRIMARY KEY (id)
;


ALTER TABLE language ADD CONSTRAINT pk_language 
	PRIMARY KEY (id)
;


ALTER TABLE note ADD CONSTRAINT pk_note 
	PRIMARY KEY (id)
;


ALTER TABLE operator ADD CONSTRAINT pk_operator 
	PRIMARY KEY (id)
;


ALTER TABLE project ADD CONSTRAINT pk_project 
	PRIMARY KEY (id)
;


ALTER TABLE role ADD CONSTRAINT pk_role 
	PRIMARY KEY (id)
;




ALTER TABLE file ADD CONSTRAINT fk_file_language 
	FOREIGN KEY (id_language) REFERENCES language (id)
;

ALTER TABLE file ADD CONSTRAINT fk_file_project 
	FOREIGN KEY (id_project) REFERENCES project (id)
;

ALTER TABLE note ADD CONSTRAINT fk_note_file 
	FOREIGN KEY (id_file) REFERENCES file (id)
;

ALTER TABLE operator ADD CONSTRAINT fk_operator_role 
	FOREIGN KEY (id_role) REFERENCES role (id)
;

ALTER TABLE project ADD CONSTRAINT fk_project_operator 
	FOREIGN KEY (id_operator) REFERENCES operator (id)
;
