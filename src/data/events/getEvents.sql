-- Select rows from a Table or View 'TableOrViewName' in schema 'SchemaName'
SELECT 
  cd_usuario          as [id],
  nm_fantasia_usuario,
  nm_usuario 
FROM [dbo].Usuario
WHERE 
  cd_usuario = @userId
  
order BY 
  nm_usuario 

  



