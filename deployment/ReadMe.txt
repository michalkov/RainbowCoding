Za³¹czone biblioteki nalezy skopiowaæ do katalogu lib domeny GlassFisha.
Dodatkowo w pliku config/login.conf dodaæ poni¿szy wpis:

flexibleRealm {
  org.wamblee.glassfish.auth.FlexibleJdbcLoginModule required;
};


Do pliku config/asenv.conf (GlassFish, nie domena!) dodaæ linijkê:
AS_JAVA="<tutaj œcie¿ka do JDK (nie JRE!)>"