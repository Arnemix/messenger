const chokidar = require('chokidar');
const fs = require('fs-extra');

const sourceDirectory = './src/components'; // Ajusté pour regarder dans le dossier src/components/

// Initialise le watcher pour surveiller les changements dans le répertoire source et ses sous-dossiers
const watcher = chokidar.watch(sourceDirectory + '/**/*.jsx', {
    ignored: /(^|[/\\])\../, // ignore les fichiers cachés
    persistent: true,
});

console.log(`Le watcher est en cours d'exécution sur le répertoire ${sourceDirectory} et ses sous-dossiers`);

// Réagit aux événements de création de fichiers
watcher.on('add', (filePath) => {
    if (filePath.endsWith('.jsx')) {
        // Génère un nom de fichier SCSS correspondant
        const scssFilePath = filePath.replace(/\.jsx$/, '.scss');

        // Crée le fichier SCSS
        fs.outputFile(scssFilePath, '// Votre contenu SCSS initial ici', (err) => {
            if (err) throw err;
            console.log(`Fichier SCSS créé : ${scssFilePath}`);
        });
    }
});

// Gestion des erreurs
watcher.on('error', (error) => console.error(`Erreur du watcher: ${error}`));

// Intercepte le signal d'arrêt et arrête proprement le watcher
process.on('SIGINT', () => {
    console.log('Arrêt du watcher');
    watcher.close();
});

