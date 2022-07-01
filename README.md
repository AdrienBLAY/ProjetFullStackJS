**Projet FullStack JS** 
**Jerome DE VIVO - Adrien BLAY**

### **1. Installation de l’application :** 
- npm install 
- npm start

### **2. VERSIONS**

|Version|Date|Modifications|
|:-:|:-:|:-:|
|3.0|01/07/2022|Ajout CSS et modification|
|2.0|01/07/2022|Modification du code|
|1.5|	30/06/2002|	Création du projet|
|1.0|	29/06/2022|	Première version

### **3. PRÉSENTATION DE L’API** 
Notre API est un outil qui permet de créer différents articles internet, de les ranger avec des tags (topics) eet de pouvoir les gérer grâce à un utilisateur créé auparavant. 
Il y a la possibilité de créer, de modifier, de voir l’historique et de voir tous les articles.
Au niveau des tags, on pourra éditer et créer des tags et de les lier à un article. 
Une barre de recherche est aussi disponible avec la possibilité de rechercher des articles ainsi que des tags. 
Une création d’utilisateur pour se connecter à l’API, on pourra plus tard dans l’interface Admin, rajouter un utilisateur ou en modifier.





### **4. AUTHENTIFICATION**
L’accès à l’API est protégé et restreint aux utilisateurs authentifiés. L’authentification, de type « basique » s’effectue par l’intermédiaire d’un login et d’un mot de passe.
Pour créer un nouvel utilisateur, il faut se rendre sur l’URL «  /#/setup  », et créer un nouvel utilisateur : 


Ensuite retourner sur la page d’accueil et rentrez vos identifiants. 


### **5.	APPELS / ROUTES**

|URL|	id|            	Détails|
|:-:|:-:|:-:|
|/#/home|	|	Page d’accueil de l’API|
|/#/article/new/:articleId	|Numéro de l’ID de l’article	|Création d’un article|
|/#/article/edit/:articleId	|Numéro de l’ID de l’article	|Pour éditer un article|
|/#/article/history/:articleId	|Numéro de l’ID de l’article|	Pour voir les différentes versions des articles|
|/#/article/:articleId"	|Numéro de l’ID de l’article	|Pour voir un article
|/#/admin|		|Pour voir l’interface admin
|/#/topic/edit/:topicId	|Numéro de l’ID pour le topic	|Pour pouvoir éditer un topic/tag
|/#/user/edit/:userId	|Numéro de l’ID pour le topic	|Pour pouvoir éditer un user
|/#/search	|	|Pour faire des recherches (topic, article)
|/#/setup	|	|Pour créer un utilisateur

### **6.	LISTE DES DONNÉES**
Il y a quatre tables : 
-	archives :  id / article_id / title / body / updated_at / user_id / what_changed
-	articles : id / title / body / created_at / updated_at / topic_id / user_id / what_changed
-	topics : id / name / description / created_at / updated_at 
-	users : id / name / email / password / about / created_at / updated_at 
