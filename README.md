# jsr-spock
petite réalisation pour jouer à pierre feuille ciseaux...

la partie pierre feuille ciseaux offline fonctionne, avec comptage des points. La partie serveur est presque prête.

Il demeure à noter que meteor intègre de base l'optimisation des assets quand on passe en production.
Par conséquent, histoire de montrer que je ne suis pas une bille en ce qui concerne leur optimisation,
j'ai pris la liberté d'ajouter un fichier gulp (à la racine du projet) que j'avais créé à l'occasion d'un autre projet
histoire de montrer que je m'y connais un minimum dans ce domaine également.

d'abord, il faut installer les dépendances avec npm :
```
npm install
```

pour lancer le serveur web :
```
meteor
```

pour lancer le serveur web en mode production (et ne pas se taper 2MB d'assets lors du chargement) :
```
meteor --production
```

pour compiler l'application vers du hybride android :
```
meteor run android-device
```
