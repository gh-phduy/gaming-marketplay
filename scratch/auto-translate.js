const fs = require('fs');
const path = require('path');

const locales = ['ar', 'da', 'de', 'el', 'es', 'fi', 'fr', 'it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt', 'sv', 'tr', 'vi', 'zh'];

const enPath = path.join(__dirname, '../messages/en.json');
const newTransPath = path.join(__dirname, 'translations.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const newData = JSON.parse(fs.readFileSync(newTransPath, 'utf8'));

// Deep Merge
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

deepMerge(enData, newData);
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
console.log('✅ Merged new keys into en.json');

// Translate function via Google Translate free endpoint
async function translateText(text, targetLang) {
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
    const json = await res.json();
    return json[0].map(x => x[0]).join('');
  } catch (e) {
    console.log("Translation error on chunk, falling back to English...");
    return text;
  }
}

async function run() {
  const keys = [];
  const values = [];
  
  function extract(obj, prefix = '') {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        keys.push(prefix ? `${prefix}.${key}` : key);
        values.push(obj[key]);
      } else {
        extract(obj[key], prefix ? `${prefix}.${key}` : key);
      }
    }
  }
  extract(enData);
  
  for (const lang of locales) {
    console.log(`🌐 Processing [${lang}]...`);
    const langPath = path.join(__dirname, `../messages/${lang}.json`);
    let langData = {};
    if (fs.existsSync(langPath)) {
      langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));
    }
    
    // Find missing keys or keys that fell back to English in the namespaces we refactored
    let missingKeys = [];
    let missingValues = [];
    for (let i = 0; i < keys.length; i++) {
      const parts = keys[i].split('.');
      let current = langData;
      let found = true;
      for (const p of parts) {
        if (!current || typeof current !== 'object' || !(p in current)) { 
          found = false; 
          break; 
        }
        current = current[p];
      }
      
      // If key is missing, or it exists but matches the original English value (meaning it fell back to English)
      if (!found || (typeof current === 'string' && current === values[i])) {
        missingKeys.push(keys[i]);
        missingValues.push(values[i]);
      }
    }
    
    if (missingKeys.length === 0) {
      console.log(`✓ ${lang} is already up to date.`);
      continue;
    }
    
    console.log(`   -> Found ${missingKeys.length} keys to translate. Translating...`);
    
    const translatedValues = [];
    // Hybrid batching: translate in batches of 10, fallback to one-by-one only if translation breaks the delimiter
    for (let i = 0; i < missingValues.length; i += 10) {
      const chunk = missingValues.slice(i, i + 10);
      const combined = chunk.join(' |~| ');
      
      let translated = await translateText(combined, lang);
      // Flexible regex split matching both normal and full-width bars/tilde with spacing
      let split = translated.split(/\s*[|｜]\s*[~～]\s*[|｜]\s*/).map(x => x.trim());
      
      if (split.length === chunk.length) {
        translatedValues.push(...split);
      } else {
        // Fallback to one-by-one translation for this chunk to prevent English leaking
        for (const val of chunk) {
          const single = await translateText(val, lang);
          translatedValues.push(single);
          await new Promise(r => setTimeout(r, 600));
        }
      }
      await new Promise(r => setTimeout(r, 600));
    }
    
    // Apply missing translations
    for (let i = 0; i < missingKeys.length; i++) {
      const parts = missingKeys[i].split('.');
      let current = langData;
      for (let j = 0; j < parts.length - 1; j++) {
        if (!current[parts[j]]) current[parts[j]] = {};
        current = current[parts[j]];
      }
      // Clean up string artifacts
      let cleaned = translatedValues[i] || missingValues[i];
      if (typeof cleaned === 'string') {
        cleaned = cleaned.replace(/\|\~\|/g, '').trim();
      }
      current[parts[parts.length - 1]] = cleaned;
    }
    
    fs.writeFileSync(langPath, JSON.stringify(langData, null, 2));
    console.log(`✅ Successfully updated ${lang}.json`);
  }
  
  console.log('🎉 All languages synchronized and translated!');
}

run();
