Załączone biblioteki nalezy skopiować do katalogu lib domeny GlassFisha.
Dodatkowo w pliku config/login.conf dodać poniższy wpis:

flexibleRealm {
  org.wamblee.glassfish.auth.FlexibleJdbcLoginModule required;
};


Do pliku config/asenv.conf (GlassFish, nie domena!) dodać linijk�ę
AS_JAVA="<tutaj sciezka do JDK (nie JRE!)>"

Plik domain.xml należy skopiować do katalogu config domeny.