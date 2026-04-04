import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './client/public';
const files = fs.readdirSync(publicDir);

const imageFiles = files.filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.png', '.jpg', '.jpeg'].includes(ext);
});

console.log(`Encontradas ${imageFiles.length} imagens para converter.`);

for (const file of imageFiles) {
  const filePath = path.join(publicDir, file);
  const webpPath = path.join(publicDir, `${path.parse(file).name}.webp`);

  if (fs.existsSync(webpPath)) {
    console.log(`Ignorando ${file} - WebP já existe.`);
    continue;
  }

  sharp(filePath)
    .webp({ quality: 80 })
    .toFile(webpPath)
    .then(() => console.log(`Convertida: ${file} -> ${path.basename(webpPath)}`))
    .catch(err => console.error(`Erro em ${file}:`, err));
}
