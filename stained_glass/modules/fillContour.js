export function fillContour(ctx, canvas, x, y, textureSrc) {
    const texture = new Image();
    texture.src = textureSrc;
    texture.onload = function() {
        const pattern = ctx.createPattern(texture, 'repeat');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Получаем цвет пикселя по клику
        const startColor = getPixelColor(data, x, y, canvas.width);

        // Проверяем, что цвет пикселя белый
        if (isWhiteColor(startColor)) {
            ctx.fillStyle = pattern;
            floodFill(ctx, x, y, canvas.width, canvas.height, startColor, data);
        } else {
            console.log('Clicked color is not white:', startColor);
        }
    };
}

function floodFill(ctx, x, y, width, height, startColor, data) {
    const stack = [[x, y]];
    const visited = new Set();
    const threshold = 240;

    while (stack.length > 0) {
        const [currentX, currentY] = stack.pop();
        const index = (currentY * width + currentX) * 4;

        if (visited.has(`${currentX},${currentY}`)) continue;
        visited.add(`${currentX},${currentY}`);

        const currentColor = [data[index], data[index + 1], data[index + 2], data[index + 3]];

        if (isWhiteColor(currentColor)) {
            ctx.fillRect(currentX, currentY, 1, 1);
            if (currentX > 0) stack.push([currentX - 1, currentY]);
            if (currentX < width - 1) stack.push([currentX + 1, currentY]);
            if (currentY > 0) stack.push([currentX, currentY - 1]);
            if (currentY < height - 1) stack.push([currentX, currentY + 1]);
        }
    }
}

function getPixelColor(data, x, y, width) {
    const index = (y * width + x) * 4;
    return [data[index], data[index + 1], data[index + 2], data[index + 3]];
}

function isWhiteColor(color) {
    const [r, g, b, a] = color;
    const threshold = 200;
    // Проверяем, что пиксель не прозрачный и белый
    return a === 255 && r > threshold && g > threshold && b > threshold;
}