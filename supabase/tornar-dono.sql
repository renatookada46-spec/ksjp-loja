-- Depois de criar a sua conta no site (/cadastro), rode isto no SQL Editor
-- trocando o e-mail pelo seu. Isso libera o painel /painel só para você.
update public.profiles
set is_admin = true
where email = 'SEU-EMAIL-AQUI@exemplo.com';
