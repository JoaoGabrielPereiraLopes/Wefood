SELECT DISTINCT  ingredientes.Nome AS NomeIngrediente --aqui você pode especificar os capos no qual quer exibir porém eles obedecem o nome da tabela original, o DISTINCT é pra retornar todos os valores diferentes
FROM intoleranciaUsuario --tabela final na qual o join será aplicado
LEFT JOIN intolerancia ON intoleranciaUsuario.IntoleranciaID = intolerancia.ID --join intolerancia em intoleranciaUsuario
LEFT JOIN ingredientes ON intolerancia.IngredienteID = ingredientes.ID --join igrediente em intolerancia
LEFT JOIN Usuario ON intoleranciaUsuario.UsuarioID = Usuario.ID -- join usuario em intoleranciaUsuario
WHERE Usuario.nome='Dudu';--clausula where para o retorno
-- no final de tudo retorna os ingredientes que Dudu é alérgico

SELECT COMIDA.Nome, ingredientes.Nome
FROM IngredienteComida
JOIN ingredientes ON IngredienteComida.ingrediente = ingredientes.ID 
JOIN COMIDA ON IngredienteComida.comida = COMIDA.ID;
--retorna todos os ingredientes de todos os pratos
