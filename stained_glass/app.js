import { uploadImage } from './modules/imageUpload.js';
import { convertToGrayscale } from './modules/grayscale.js';
import { detectContours } from './modules/contourDetection.js';
import { fillContour } from './modules/fillContour.js';

let selectedTexture = null;
let listOfAreas = [];

document.getElementById('upload').addEventListener('change', async (event) => {
    const img = await uploadImage(event);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Отображаем изображение
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Преобразуем в черно-белое
    convertToGrayscale(ctx, canvas);

    // Определяем контуры
    detectContours(ctx, canvas);

    // Обработчик клика для заливки текстурой
    canvas.addEventListener('click', (e) => {
        if (selectedTexture) {
            fillContour(ctx, canvas, e.offsetX, e.offsetY, listOfAreas, selectedTexture);
        }
    });
});

    // Выбор текстуры пользователем
document.querySelectorAll('#textures img').forEach(img => {
    img.addEventListener('click', () => {
        document.querySelectorAll('#textures img').forEach(el => el.classList.remove('selected'));
        img.classList.add('selected');
        selectedTexture = img.src;
    });
});