CREATE TABLE COMIDA(
    ID INTEGER PRIMARY KEY,
    Preparo NUMERIC,
    Preco NUMERIC,
    Nome text
);

CREATE TABLE ingredientes(
    ID integer PRIMARY KEY,
    Nome text
);

CREATE TABLE IngredienteComida (
    comida INTEGER,
    ingrediente INTEGER,
    FOREIGN KEY (comida) REFERENCES COMIDA(ID),
    FOREIGN KEY (ingrediente) REFERENCES ingredientes(ID)
);

CREATE TABLE intolerancia (
    ID INTEGER PRIMARY KEY,
    Nome TEXT,
    IngredienteID INTEGER,
    FOREIGN KEY (IngredienteID) REFERENCES ingredientes(ID)
);

CREATE TABLE Usuario(
    ID INTEGER PRIMARY KEY,
    nome text,
    email text,
    senha text
);

CREATE TABLE intoleranciaUsuario(
    UsuarioID  integer,
    IntoleranciaID  INTEGER,
    FOREIGN KEY(UsuarioID) REFERENCES Usuario(ID),
    FOREIGN KEY(IntoleranciaID) REFERENCES intolerancia(ID)
);

CREATE TABLE pedido(
    ID INTEGER PRIMARY KEY,
    Comida INTEGER,
    Usuario INTEGER,
    Pronto BOOLEAN,
    FOREIGN KEY(Comida) REFERENCES Usuario(ID),
    FOREIGN KEY(Usuario) REFERENCES Comida(ID)
);