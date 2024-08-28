export function uploadImage(event) {
    return new Promise((resolve, reject) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                resolve(img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}