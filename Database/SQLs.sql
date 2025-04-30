--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-29 21:22:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16591)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16580)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    event_name character varying,
    date timestamp without time zone,
    description character varying,
    image_url character varying
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16579)
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 220
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- TOC entry 222 (class 1259 OID 16602)
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id integer NOT NULL,
    event_id integer NOT NULL,
    check_in character varying DEFAULT 'pending'::character varying,
    user_name character varying
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16559)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying,
    email character varying,
    password character varying NOT NULL,
    birth date,
    role character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16558)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4763 (class 2604 OID 16583)
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- TOC entry 4762 (class 2604 OID 16562)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4928 (class 0 OID 16580)
-- Dependencies: 221
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, event_name, date, description, image_url) FROM stdin;
2	Siará Tech Summit	2025-10-22 00:00:00	Fortaleza será palco do maior evento de inovação e geração de negócios do Norte e Nordeste, numa realização do Sebrae. Empresários, startups, investidores, desenvolvedores, programadores e o público em geral poderão ter acesso a palestras, rodadas de negócios, orientações e tudo o que há de mais atual no mundo do empreendedorismo. O acesso ao público é gratuito.	https://ce.agenciasebrae.com.br/wp-content/uploads/sites/7/2024/08/STS-2024_p13356_thumb_resized.jpeg
1	Symplifique Google: Tecnologia & Eventos	2025-04-08 08:00:00	O Symplifique Google é um evento realizado periodicamente pela plataforma Sympla, que é uma das principais plataformas de venda de ingressos online no Brasil. Durante esse evento, a Sympla e o Google falam sobre a parceria que está revolucionando a forma como eventos são organizados, promovidos e vivenciados.	https://th.bing.com/th/id/OIP.BrL-5az3jHvshxc767xhcwHaEN?w=296&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7
4	VTEX Day	2025-06-02 00:00:00	O VTEX Day é um evento reconhecido como um dos maiores eventos de comércio digital do mundo3. Ele reúne os mais importantes nomes do varejo, incluindo clientes, fornecedores e influenciadores, para apresentar soluções inovadoras e discutir as tendências do setor.	https://i0.wp.com/engenharia360.com/wp-content/uploads/2022/04/Ciclo-E-commerce-e1650305229941.jpg
3	Web Summit Rio	2025-04-27 00:00:00	Web Summit Rio retornou ao Rio de Janeiro (RJ) para discutir tendências do mundo da tecnologia. O evento terá palestras, workshops e demais oportunidades de encontro com especialistas, fundadores de startups, investidores e executivos de grandes empresas.	https://prefeitura.rio/wp-content/uploads/2024/04/Foto.jpeg
\.


--
-- TOC entry 4929 (class 0 OID 16602)
-- Dependencies: 222
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptions (id, user_id, event_id, check_in, user_name) FROM stdin;
b5f48dd8-58fd-4329-afc4-d99a5b940911	3	1	pending	Matuain
e1aeb2ff-dac5-47af-8ef4-d4d3519de2c5	3	2	pending	Matuain
a7d585aa-9308-4749-951d-cf4d5e9c5d88	3	4	pending	Matuain
bf3a007e-38d9-4266-801d-cfb78efed9b9	2	2	pending	Junior
ddd57d6b-2d91-4fa6-9aa4-8c7fe97a9792	2	3	pending	Junior
efb6756e-58f1-44fe-bb0c-61a96f7b62f8	7	1	pending	Henrique Neto
6f25f203-8491-4e49-a8f6-7c269b8a83d5	7	3	pending	Henrique Neto
5213de8a-253a-4b0f-88ad-49460a7394ef	7	4	pending	Henrique Neto
02710d25-f7a4-4b07-848f-e5ed6845ffdd	7	2	pending	\N
\.


--
-- TOC entry 4926 (class 0 OID 16559)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, birth, role) FROM stdin;
1	Luciana	luciana@gmail.com	123	1990-03-12	user
2	Junior	junior@gmail.com	456	1990-03-12	user
3	Matuain	matheuszinda160@gmail.com	$2b$10$ngcxqBtK79al8o3My.KRvuhHVd3xf.FrUHVQH9mNywSWldaAc9bFK	2000-09-12	user
7	Henrique Neto	henrique@gmail.com	$2b$10$SuwC/mg6GbZ.x09oT2cbSOFn4NPwla8m2.Z7oG6B4Gs2ATMu/RsM6	2000-09-12	user
9	Dávila	davila@gmail.com	$2b$10$dT8hJ24Z0byOJ5JbhPxg1eqN5oIfMF/6tmGDhyg61mo.f0ONkYnei	2004-07-14	admin
10	Admin	admin@gmail.com	$2b$10$.xPlYZpmGCVgnAFqQRO9/Ob8QebT0tVbbLLvlDnC/F1775bhBHpYG	2012-12-12	admin
\.


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 220
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 4, true);


--
-- TOC entry 4939 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- TOC entry 4771 (class 2606 OID 16587)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 4775 (class 2606 OID 16610)
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- TOC entry 4777 (class 2606 OID 16612)
-- Name: subscriptions subscriptions_user_id_event_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_user_id_event_id_key UNIQUE (user_id, event_id);


--
-- TOC entry 4767 (class 2606 OID 16568)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4769 (class 2606 OID 16566)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4772 (class 1259 OID 16643)
-- Name: idx_subscriptions_event_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_subscriptions_event_id ON public.subscriptions USING btree (event_id);


--
-- TOC entry 4773 (class 1259 OID 16642)
-- Name: idx_subscriptions_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_subscriptions_user_id ON public.subscriptions USING btree (user_id);


--
-- TOC entry 4778 (class 2606 OID 16618)
-- Name: subscriptions subscriptions_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- TOC entry 4779 (class 2606 OID 16613)
-- Name: subscriptions subscriptions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-04-29 21:22:32

--
-- PostgreSQL database dump complete
--

