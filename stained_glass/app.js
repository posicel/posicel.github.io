import { uploadImage } from './modules/imageUpload.js';
import { convertToGrayscale } from './modules/grayscale.js';
import { detectContours } from './modules/contourDetection.js';
import { fillContour } from './modules/fillContour.js';

let selectedTexture = null;
let listOfAreas = [];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

// Создаем объект Image и загружаем в него изображение
const img = new Image();
img.src = 'pictures/bird.jpg';

img.onload = function() {
    pictureProcessing(ctx, canvas, img);
};

img.onerror = function() {
    console.error("Ошибка загрузки изображения по пути: " + img.src);
};

function pictureProcessing(ctx, canvas, img) {
    listOfAreas = [];

    // Устанавливаем размеры canvas по размеру изображения
    canvas.width = img.width;
    canvas.height = img.height;

    // Отображаем изображение
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

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
};

document.getElementById('upload').addEventListener('change', async (event) => {
    const img = await uploadImage(event);
    pictureProcessing(ctx, canvas, img);
});

// Выбор текстуры пользователем
document.querySelectorAll('#textures img').forEach(img => {
    img.addEventListener('click', () => {
        document.querySelectorAll('#textures img').forEach(el => el.classList.remove('selected'));
        img.classList.add('selected');
        selectedTexture = img.src;
    });
});