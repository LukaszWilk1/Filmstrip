--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2024-06-06 19:43:57

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE DATABASE filmstrip;

\c filmstrip;

--
-- TOC entry 215 (class 1259 OID 16445)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(20),
    user_password character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16453)
-- Name: users_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_comments (
    comment_id integer NOT NULL,
    comment_text character varying(255),
    user_id integer,
    movie_id integer,
    comment_date timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users_comments OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16452)
-- Name: users_comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_comments_comment_id_seq OWNER TO postgres;

--
-- TOC entry 3347 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_comments_comment_id_seq OWNED BY public.users_comments.comment_id;


--
-- TOC entry 214 (class 1259 OID 16444)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3348 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 219 (class 1259 OID 16464)
-- Name: users_series_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_series_comments (
    comment_id integer NOT NULL,
    comment_text character varying(255),
    user_id integer,
    series_id integer,
    comment_date date DEFAULT CURRENT_DATE
);


ALTER TABLE public.users_series_comments OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16463)
-- Name: users_series_comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_series_comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_series_comments_comment_id_seq OWNER TO postgres;

--
-- TOC entry 3349 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_series_comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_series_comments_comment_id_seq OWNED BY public.users_series_comments.comment_id;


--
-- TOC entry 3183 (class 2604 OID 16448)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3184 (class 2604 OID 16456)
-- Name: users_comments comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_comments ALTER COLUMN comment_id SET DEFAULT nextval('public.users_comments_comment_id_seq'::regclass);


--
-- TOC entry 3186 (class 2604 OID 16467)
-- Name: users_series_comments comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_series_comments ALTER COLUMN comment_id SET DEFAULT nextval('public.users_series_comments_comment_id_seq'::regclass);


--
-- TOC entry 3337 (class 0 OID 16445)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, login, user_password) VALUES (1, 'lukasz', 'gigachad');
INSERT INTO public.users (id, login, user_password) VALUES (2, 'seba', '1');
INSERT INTO public.users (id, login, user_password) VALUES (3, 'seba2', '$2b$10$Ih.wc0GqeSr8YwFUhiMAaOdgslxq83ymAGP69YyxSc1ptTrhXNBeC');
INSERT INTO public.users (id, login, user_password) VALUES (4, 'Marcin', '$2b$10$VKulhRsZnq8nzjZDqCkos.QnLyqZc3kTXM5gVaNOLNUCGOJwwutTC');
INSERT INTO public.users (id, login, user_password) VALUES (5, 'filip', '$2b$10$Np6GIRPJFYXDy3GxwQNmUuVWhMuPqM42EVRH0q7ycgwJfgneC1tEO');
INSERT INTO public.users (id, login, user_password) VALUES (6, 'seba321', '$2b$10$v6RRufRE9CCApUIjPZMfOeScgRUpAQhmsQpgfuLBAfr4XPCzmhzsS');
INSERT INTO public.users (id, login, user_password) VALUES (7, 'esssa4321', '$2b$10$XnNYhCtAf1u5DH3IG7sj/O7hPAVbVoboqec9bfXe3mPQVptUcD3im');
INSERT INTO public.users (id, login, user_password) VALUES (8, 'Kacper', '$2b$10$0pT2agS4hfYIfx0SV6sDUOed55p98HkH.XITWdyvVFNTt4ViB2zvu');
INSERT INTO public.users (id, login, user_password) VALUES (9, 'siemano', '$2b$10$9AO59Qh0HDGf77..HVK.V.mTiPmjWVX3nyjAeUY/lHhF66bB4Dn3W');
INSERT INTO public.users (id, login, user_password) VALUES (10, 'piwo', '$2b$10$hD9N91nZ54XuchGgLFE3cemQMzbTPT8D9Cpy65938T105N6Ljt29S');
INSERT INTO public.users (id, login, user_password) VALUES (11, 'sadgasdgasg', '$2b$10$3FrtlmQplUEmPnf5/DD6yOqN6VBZNbJXs7pITELefq.BrUt4V0izu');
INSERT INTO public.users (id, login, user_password) VALUES (12, 'dsfgsf', '$2b$10$21Gt5k/SISEn2ZxIDK0OvOUzK1/8KcDwN9zsXsoJ9MSjfOIGw8Rba');
INSERT INTO public.users (id, login, user_password) VALUES (13, 'aa', '$2b$10$QMlAOfUiuwan0L0Paddx5.SE5zCmUrotvgXd5mCpfj4wGwrD2Upl6');
INSERT INTO public.users (id, login, user_password) VALUES (14, 'a', '$2b$10$cehMRGEryfHdIOnIGYL1.Oyrkssx6DoB99SLa7Ux.MDaGO8Gb0DZG');
INSERT INTO public.users (id, login, user_password) VALUES (15, 'g', '$2b$10$cq22OBbOIVh01dAaZV9GkeMH1t2mhzzhIk3QeDfLiuf/eprZkF/Uu');
INSERT INTO public.users (id, login, user_password) VALUES (16, 'aasdgasdgsdg', '$2b$10$dowrlpAKkEQcYK30ZGTqrOIq68kwHuUBU0aeaBXbkJx5Gu.GWYw6G');
INSERT INTO public.users (id, login, user_password) VALUES (17, 'h', '$2b$10$kZ3eIDaT2QcKQ0fFr4UDguuZXw94ZK3sqy5ALvLVj2ILmbmpSjPw2');
INSERT INTO public.users (id, login, user_password) VALUES (18, 'w', '$2b$10$RPOQr7j.CRUkZI7hJNI2ceAx/cujzeykpL4T4Xl1UzMjTajeDjQvS');
INSERT INTO public.users (id, login, user_password) VALUES (19, 'gop', '$2b$10$vawCvJTUfu3yInb2c7wSjuxdmrwMe1yAjlSAXnGGz9dF2BtsXLODS');
INSERT INTO public.users (id, login, user_password) VALUES (20, 'q', '$2b$10$dVr/9vUX7Mf/9C3tZ85fceknJoM9wDNNo/1zBIbPz35DCWjDKKKtm');
INSERT INTO public.users (id, login, user_password) VALUES (21, 'f', '$2b$10$Q2izNNs6pLftB.esrWSltetnYhdD0U4o6zzlYeyCgxK/S0FlTpYC6');
INSERT INTO public.users (id, login, user_password) VALUES (22, 'x', '$2b$10$9/AJN43AkRLEczlXheM79.MPnNGPqjCTBrYwpwpB9Zb7has0ekot6');
INSERT INTO public.users (id, login, user_password) VALUES (23, 'p', '$2b$10$OBiwYxFnsiLnSjZ7O8tnVO45FUdxWh2ueXfKnrpmUKcYRz6rw7QKO');
INSERT INTO public.users (id, login, user_password) VALUES (24, 'wwww', '$2b$10$vgaPKnfqhCmNW1.veCet/Ov8RF85C5dGnKBvmt44SrvNhfvQk5czi');
INSERT INTO public.users (id, login, user_password) VALUES (25, 'piwoasdasdas', '$2b$10$MO6nizY8Y31F9X9FQXtkbOerZqeNXef8AwsTemUreddh5abia1v2i');
INSERT INTO public.users (id, login, user_password) VALUES (26, 'sq', '$2b$10$BSUwLJciDC1NwdTXdqrvc.D0ed9pMEIgk4/6r0kFfNSKBEs7v9JZy');
INSERT INTO public.users (id, login, user_password) VALUES (27, 'hh', '$2b$10$7DUwRdNuxfmQ8nyYM4loY.93J6U/tsexPPuDDJ/0aB.oS9OHRR2iK');
INSERT INTO public.users (id, login, user_password) VALUES (28, 'aaaaa', '$2b$10$k8E/UoKnnjrdF5ZXYbJMTeOYtKn50dfhs6NKznjIKih84l6sxfW0C');
INSERT INTO public.users (id, login, user_password) VALUES (29, 'hdfsbdsfdsf', '$2b$10$vIyqZ0WJKlIFPds0ajC.p.7Tlf0wKYPd9pAvbm7VTCV01GcVabKGC');
INSERT INTO public.users (id, login, user_password) VALUES (30, 'fifo', '$2b$10$2CFRQ2fzhcRRmIB6Nb.3eeW6tPQWaQmEiXxaZ/LMOrgUiESYMumZa');
INSERT INTO public.users (id, login, user_password) VALUES (31, 'kokoko', '$2b$10$S/i2r8v.Oi.viZT16Ualx.AfbmgipAPHQzKfcBkxQ28Iw9LLZJkMC');
INSERT INTO public.users (id, login, user_password) VALUES (32, 'sus', '$2b$10$ZsBjUnLZjEMM.B0JCwYww.seaARwSdpiZzv9Y1hFf9EI5EGrvZde.');
INSERT INTO public.users (id, login, user_password) VALUES (33, 'lol', '$2b$10$g.we7UOOluYAgPon1bUF9umY4DcQJ34EEAkOetgOeuuNhhsy83ax.');
INSERT INTO public.users (id, login, user_password) VALUES (34, 'jk', '$2b$10$dAOpRzdtVOAR4dMyXStXfu0pj2DJyXEPzki6CBP7iTeUJetWA.Cl2');
INSERT INTO public.users (id, login, user_password) VALUES (35, 'hyhy', '$2b$10$56x0QSlfbgt26ANE8S3DU./Fe2vN7RD7ykiHCidOFQhwUsrRvo/26');
INSERT INTO public.users (id, login, user_password) VALUES (36, 'fff', '$2b$10$qUY.5SM4kdRCcq9MioayLOm2d5VsKFA6lTdgA5uynyLpDU80OqSTS');
INSERT INTO public.users (id, login, user_password) VALUES (37, 'lllll', '$2b$10$nwXn0kIa0iq5LCZe43zcMuAe5Lw//7eVTNOBuYYQfxvyKAJdNZapy');
INSERT INTO public.users (id, login, user_password) VALUES (38, 'huhu', '$2b$10$MoIhLtUSWq/tQA35ADFZr.dvIBJvmEYpjAbQHnDy/J1dwj.IhE0WK');
INSERT INTO public.users (id, login, user_password) VALUES (39, 'jjijij', '$2b$10$0aJNaO212dhKHjhX9Uu2tOXOAAWJPw.rXWgdczG5TH7Y7KMZDBYee');
INSERT INTO public.users (id, login, user_password) VALUES (40, 'pp', '$2b$10$z0kicfg29Gd.pUWpuaYtQ.SQYj5SXjiEpmh1gGowVMzmbURdNs.mu');
INSERT INTO public.users (id, login, user_password) VALUES (41, 'qqqqqqqqqq', '$2b$10$FGw0gXV4L2fl9jIY3C5USe9JfGd/yz36WX3mr7HAJndZpuUR15Mwu');
INSERT INTO public.users (id, login, user_password) VALUES (42, 'kk', '$2b$10$80NRWnluEM1XsBWBcvRxMO6tOpjRiqCOSPbbcdHez7b28Q07S4c7W');
INSERT INTO public.users (id, login, user_password) VALUES (43, 'v', '$2b$10$Uu1ZJ4vDhZ9S/m7fX3xzu.yNd2gh9VzC4njlBuT60tWu42KQmcr4y');
INSERT INTO public.users (id, login, user_password) VALUES (44, 'gdfgfd', '$2b$10$4mbUPIG7XV7nCvBJdvDPa.ii6jWG0Wobg8IcGAeEIVdTypP2f7SZC');
INSERT INTO public.users (id, login, user_password) VALUES (45, 'sisi', '$2b$10$JA2qOUtC/vmH6kyPQPJchOMYs7q4finnoVocOAvIyS8qv4zNNX1ZC');
INSERT INTO public.users (id, login, user_password) VALUES (46, 'sieeeeemaASD', '$2b$10$K8bxu9kldNrc2i9YGZIpEO0RMVie1sDH3484Tq..I7hvktqvHnLlC');
INSERT INTO public.users (id, login, user_password) VALUES (47, 'cyc', '$2b$10$nuKqDquo2FGqDLSmuI04m.2xGmrZ.tPYHfR3ePGMAZX2wMt9P3kRO');
INSERT INTO public.users (id, login, user_password) VALUES (48, 'dd', '$2b$10$njLUGlNyPv5dY4aF9acs5euJPa5B6i8p5LCs4czxc4465Z3920M/.');
INSERT INTO public.users (id, login, user_password) VALUES (49, 'ddd', '$2b$10$GpZ/n2Hms0QlPrlB26pH7uobvd3sny7klq5kgzf7zm2mqiPirAzz.');
INSERT INTO public.users (id, login, user_password) VALUES (50, 'kej', '$2b$10$lEfcbKyaHP6iEobmX3A/1ONko0wYZEDQms09TlT0TIJtukHr7EDCu');
INSERT INTO public.users (id, login, user_password) VALUES (52, 'system', '$2b$10$j4WlLs72KJ7VvbrW0Lrh4eZhafVR.iYASgweNaCGELhAhvPMPaKQ2');
INSERT INTO public.users (id, login, user_password) VALUES (53, 'piwosz', '$2b$10$tW7fF0XMT01yGMmVWiZiN.Ye3FD.BcFVlsrx4.W1SnX7oJ7kv/MHu');
INSERT INTO public.users (id, login, user_password) VALUES (54, 'alkoholikus', '$2b$10$34nc.3QHLHrfGVHgFzW0TegmEy93xa8iMkcnXYkFWzUTmnmXpMT9O');
INSERT INTO public.users (id, login, user_password) VALUES (55, 'gagag1', '$2b$10$4xIFrprufTIHPj1dxBtQnOAkEcaBvXHn1FDd83a0Hz4XJYy1slpHe');
INSERT INTO public.users (id, login, user_password) VALUES (57, 'pipi', '$2b$10$l92BLM5TkgJZ.7nmvmecl.PQe6Ak.yaN0R1uhIcrT.X2xU8NjdmXW');
INSERT INTO public.users (id, login, user_password) VALUES (58, 'ugabuga', '$2b$10$x0H79lKAu8dLOsCQWqQhYeOiSrU5.XS/SV.UgtI7JWj/lH4x5cU.a');
INSERT INTO public.users (id, login, user_password) VALUES (59, 'Siemaszko', '$2b$10$An9XhdfUgkQAAXGaPy6ffOEnyJBTwOcmLG527TbaHrb6lmZxytaBO');
INSERT INTO public.users (id, login, user_password) VALUES (63, 'lukasz1', '$2b$10$OZpLaeABhkYAfkoFsU81fuAUKpCZXJp/adyzLY33U3SLnl6sq/L46');
INSERT INTO public.users (id, login, user_password) VALUES (60, 'kubicki', '$2b$10$W5e9mwNCoX7sSnk6SlNWbuUkwjMVD7xNOtdi.CL8ukayFK6a.ZB5W');


--
-- TOC entry 3339 (class 0 OID 16453)
-- Dependencies: 217
-- Data for Name: users_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users_comments (comment_id, comment_text, user_id, movie_id, comment_date) VALUES (1, 'good movie', 1, 1, '2024-03-02 18:36:52.117782');
INSERT INTO public.users_comments (comment_id, comment_text, user_id, movie_id, comment_date) VALUES (29, NULL, NULL, NULL, '2024-03-03 16:15:30.427797');
INSERT INTO public.users_comments (comment_id, comment_text, user_id, movie_id, comment_date) VALUES (30, NULL, NULL, NULL, '2024-03-03 16:15:45.473871');
INSERT INTO public.users_comments (comment_id, comment_text, user_id, movie_id, comment_date) VALUES (31, NULL, NULL, NULL, '2024-03-03 16:16:46.84649');
INSERT INTO public.users_comments (comment_id, comment_text, user_id, movie_id, comment_date) VALUES (38, 'Ciężko się nie zgodzić. Wybitne kino!', 59, 693134, '2024-03-03 18:28:52.390253');
INSERT INTO public.users_comments (comment_id, comment_text, user_id, movie_id, comment_date) VALUES (3, 'wódke też!', NULL, NULL, '2024-03-02 18:36:52.117782');
INSERT INTO public.users_comments (comment_id, comment_text, user_id, movie_id, comment_date) VALUES (44, 'Jak ja kocham ten film <3', 63, 68721, '2024-03-05 16:36:26.335625');


--
-- TOC entry 3341 (class 0 OID 16464)
-- Dependencies: 219
-- Data for Name: users_series_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3350 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_comments_comment_id_seq', 44, true);


--
-- TOC entry 3351 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 63, true);


--
-- TOC entry 3352 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_series_comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_series_comments_comment_id_seq', 6, true);


--
-- TOC entry 3191 (class 2606 OID 16458)
-- Name: users_comments users_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_comments
    ADD CONSTRAINT users_comments_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 3189 (class 2606 OID 16450)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3193 (class 2606 OID 16470)
-- Name: users_series_comments users_series_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_series_comments
    ADD CONSTRAINT users_series_comments_pkey PRIMARY KEY (comment_id);


-- Completed on 2024-06-06 19:43:57

--
-- PostgreSQL database dump complete
--

