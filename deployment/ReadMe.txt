Za��czone biblioteki nalezy skopiowa� do katalogu lib domeny GlassFisha.
Dodatkowo w pliku config/login.conf doda� poni�szy wpis:

flexibleRealm {
  org.wamblee.glassfish.auth.FlexibleJdbcLoginModule required;
};


Do pliku config/asenv.conf (GlassFish, nie domena!) doda� linijk�:
AS_JAVA="<tutaj �cie�ka do JDK (nie JRE!)>"