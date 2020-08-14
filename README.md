# projektTo2
Projekt na Technologie Obietkowe 

Ustawienia bazy danych:

Plik znajduję się w main/java/resources/application.properties

Plik jest ustawiony na Mysql szczęgólnie na Xampa, nie trzeba używać akurat Xampa wtedy trzeba zmieniać dialect czyli:

spring.jpa.database-platform=org.hibernate.dialect.MariaDB10Dialect 

na który będzie kompatybilny z bazą
Oraz tutaj trzeba ustawić nazwe baze danych i użytkownika:

spring.datasource.url=jdbc:mysql://localhost:3306/db_tetris?useSSL=false&serverTimezone=UTC

spring.datasource.username=root

spring.datasource.password=

db_tetris = nazwa bazy danych
