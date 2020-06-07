const api = {
    base_url: '/api/images',
    async fetchData(method = 'GET', imageName) {
        console.log(imageName);
        const response = await fetch(`${this.base_url}${imageName ? `?image=${imageName}` : ''}`, {
            method,
        });
        if (!response.ok) return {};
        const data = await response.json();
        return data;
    },
};

const app = {
    started: false,
    active: true,
    contentType: '',
    currentImageName: '',
    set currentImageUrl(url) {
        const image = document.getElementById('preview-image');
        if (this.contentType && this.contentType.includes('image')) {
            image.outerHTML = `<img alt="Image" id="preview-image" src="${url}">`;
        } else if (this.contentType && this.contentType.includes('video')) {
            image.outerHTML = `<video autoplay alt="Video" id="preview-image" src="${url}"></video>`;
        }
    },
    async setNewUrl() {
        const { name, url, contentType } = await api.fetchData();

        if (!url || !name) {
            this.contentType = 'image/png';
            this.currentImageUrl = 'https://miro.medium.com/max/3840/1*S89gBM63qM-_kQ6wVHtBzw.png'; // DONE IMAGE
            this.active = false;
        } else {
            this.contentType = contentType;
            this.currentImageUrl = url;
            this.currentImageName = name;
        }
    },
    async saveImage() {
        await api.fetchData('PUT', this.currentImageName);
    },
    async deleteImage() {
        await api.fetchData('DELETE', this.currentImageName);
    },
};

document.addEventListener('keydown', async (event) => {
    if ((event.keyCode === 75 || event.keyCode === 68) && app.active) {
        if (event.keyCode === 75) {
            await app.saveImage();
        }

        if (event.keyCode === 68) {
            await app.deleteImage();
        }

        // Get new image
        await app.setNewUrl();
    }
});

document.addEventListener('click', () => {
    if (!app.started) {
        app.started = true;
        app.setNewUrl();
    }
});
