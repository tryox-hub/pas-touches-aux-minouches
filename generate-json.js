const fs = require('fs');
const path = require('path');

// Fonction pour parser le frontmatter YAML
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Enlever les guillemets si présents
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Convertir les booléens
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      
      frontmatter[key] = value;
    }
  });
  
  return frontmatter;
}

// Fonction pour lire un dossier et extraire les données
function readCollection(folderName) {
  const folderPath = path.join(__dirname, folderName);
  const data = [];
  
  if (!fs.existsSync(folderPath)) {
    console.log(`Dossier ${folderName} n'existe pas encore`);
    return data;
  }
  
  const files = fs.readdirSync(folderPath);
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(folderPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const frontmatter = parseFrontmatter(content);
      
      if (frontmatter) {
        data.push(frontmatter);
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
console.log(`   - ${chats.length} chats adultes`);
console.log(`   - ${chatons.length} chatons`);
