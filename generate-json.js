const fs = require('fs');
const path = require('path');

// Fonction pour parser le frontmatter YAML
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const frontmatter = {};
  const yamlContent = match[1];
  
  // Parser YAML simplifié pour gérer les objets imbriqués
  const lines = yamlContent.split('\n');
  let currentObject = frontmatter;
  let currentKey = null;
  let indentLevel = 0;
  const objectStack = [frontmatter];
  
  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    
    const currentIndent = line.search(/\S/);
    const colonIndex = trimmed.indexOf(':');
    
    if (colonIndex > 0) {
      const key = trimmed.substring(0, colonIndex).trim();
      let value = trimmed.substring(colonIndex + 1).trim();
      
      // Gérer les valeurs
      if (value === '') {
        // C'est un objet
        currentObject[key] = {};
        objectStack.push(currentObject[key]);
        currentObject = currentObject[key];
        currentKey = key;
      } else {
        // Enlever les guillemets
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        
        // Convertir les booléens
        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        // Convertir les nombres
        else if (!isNaN(value) && value !== '') value = Number(value);
        
        currentObject[key] = value;
      }
    }
  });
  
  return frontmatter;
}

// Fonction pour transformer les données pour l'affichage
function transformData(data) {
  // Extraire les données imbriquées
  const identite = data.identite || {};
  const photos = data.photos || {};
  const caractere = data.caractere || {};
  const sante = data.sante || {};
  
  // Construire l'âge lisible
  let age = 'Non précisé';
  if (identite.age_nombre && identite.age_unite) {
    age = `${identite.age_nombre} ${identite.age_unite.toLowerCase()}`;
  }
  
  // Construire le sexe lisible
  let sexe = identite.sexe || 'Non précisé';
  if (sexe === 'Petit Monsieur') sexe = 'Mâle';
  if (sexe === 'Petite Dame') sexe = 'Femelle';
  
  // Construire la description complète
  let description = data.description || '';
  
  // Ajouter les traits de caractère
  if (caractere.traits && caractere.traits.length > 0) {
    const traits = Array.isArray(caractere.traits) ? caractere.traits.join(', ') : caractere.traits;
    description += (description ? '\n\n' : '') + `Caractère : ${traits}`;
  }
  
  // Ajouter les infos santé
  const santeInfo = [];
  if (sante.sterilise) santeInfo.push('Stérilisé(e)');
  if (sante.puce) santeInfo.push('Pucé(e)');
  if (sante.vaccine) santeInfo.push('Vacciné(e)');
  if (santeInfo.length > 0) {
    description += (description ? '\n\n' : '') + `Santé : ${santeInfo.join(', ')}`;
  }
  
  if (sante.notes) {
    description += (description ? '\n\n' : '') + `Notes médicales : ${sante.notes}`;
  }
  
  // Ajouter les compatibilités
  const compatibilites = [];
  if (caractere.ok_chiens) compatibilites.push('Ok avec les chiens');
  if (caractere.ok_enfants) compatibilites.push('Ok avec les enfants');
  if (compatibilites.length > 0) {
    description += (description ? '\n\n' : '') + compatibilites.join(' • ');
  }
  
  return {
    nom: identite.nom || 'Sans nom',
    photo: photos.photo_principale || 'https://via.placeholder.com/300',
    age: age,
    sexe: sexe,
    race: identite.race || 'Européen',
    description: description,
    adopte: data.adopte || false,
    // Garder aussi les données brutes pour référence
    _raw: data
  };
}

// Fonction pour lire un dossier et extraire les données
function readCollection(folderName) {
  const folderPath = path.join(__dirname, folderName);
  const data = [];
  
  if (!fs.existsSync(folderPath)) {
    console.log(`📁 Dossier ${folderName} n'existe pas encore`);
    return data;
  }
  
  const files = fs.readdirSync(folderPath);
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(folderPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const frontmatter = parseFrontmatter(content);
      
      if (frontmatter) {
        const transformed = transformData(frontmatter);
        data.push(transformed);
      }
    }
  });
  
  return data;
}

// Créer le dossier api s'il n'existe pas
const apiDir = path.join(__dirname, 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir);
}

// Générer les fichiers JSON
console.log('🚀 Génération des fichiers JSON...\n');

const chats = readCollection('_chats');
const chatons = readCollection('_chatons');

fs.writeFileSync(
  path.join(apiDir, 'chats.json'),
  JSON.stringify(chats, null, 2)
);

fs.writeFileSync(
  path.join(apiDir, 'chatons.json'),
  JSON.stringify(chatons, null, 2)
);

console.log('✅ Fichiers JSON générés avec succès !');
console.log(`   🐱 ${chats.length} chats adultes`);
console.log(`   🐾 ${chatons.length} chatons\n`);

// Afficher un aperçu si il y a des données
if (chats.length > 0 || chatons.length > 0) {
  console.log('📝 Aperçu des données :');
  if (chats.length > 0) {
    console.log(`   Premier chat : ${chats[0].nom} (${chats[0].age}, ${chats[0].sexe})`);
  }
  if (chatons.length > 0) {
    console.log(`   Premier chaton : ${chatons[0].nom} (${chatons[0].age}, ${chatons[0].sexe})`);
  }
}
