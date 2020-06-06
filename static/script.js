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
    active: true,
    currentImageName: '',
    set currentImageUrl(url) {
        document.getElementById('preview-image').src = url;
    },
    async setNewUrl() {
        const { name, url } = await api.fetchData();

        if (!url || !name) {
            this.currentImageUrl = 'https://miro.medium.com/max/3840/1*S89gBM63qM-_kQ6wVHtBzw.png'; // DONE IMAGE
            this.active = false;
        } else {
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

const init = () => {
    app.setNewUrl();
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

init();
