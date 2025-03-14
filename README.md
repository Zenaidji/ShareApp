# Share-App

Une application de partage d'objets en temps réel construite avec **Express.js**, **Node.js**, **MongoDB**, et **Socket.IO**.

---

## Table des matières

1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Lancement de l'application](#lancement-de-lapplication)

---

## Prérequis

Avant de lancer l'application, assurez-vous d'avoir les éléments suivants installés et configurés :

1. **Node.js** et **npm** :

   - Téléchargez et installez Node.js à partir de [nodejs.org](https://nodejs.org/).
   - Vérifiez l'installation avec les commandes suivantes :
     ```bash
     node -v
     npm -v
     ```

2. **MongoDB** :

   - Installez MongoDB sur votre système. Suivez le guide officiel : [Install MongoDB](https://www.mongodb.com/docs/manual/installation/).
   - Créez un dossier `dbData` à la racine du projet pour stocker les données locales de MongoDB :
     ```bash
     mkdir dbData
     ```
   - Lancez MongoDB en utilisant ce dossier comme chemin de données :
     ```bash
     mongod --dbpath dbData
     ```

---

## Installation

1. Clonez ce dépôt (ou téléchargez-le) :

   ```
   git clone https://github.com/Zenaidji/ShareApp.git
   ```

2. Installez les dépendances du projet :

   ```
    npm install
   ```

3. Démarez le serveur avec :

   ```
    npm start
   ```

## Lancement de l'application

Accder via votre navigateur à:

```
http://localhost:3000
```
