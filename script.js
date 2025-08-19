document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen dari HTML, termasuk tombol baru
    const startButton = document.getElementById('start-button');
    const mainText = document.getElementById('main-text');
    const finalMessage = document.getElementById('final-message');
    const song = document.getElementById('romantic-song');
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    const flowerAndHeart = document.getElementById('flower-and-heart');

    let particles = [];

    // Teks utama
    const greeting = "Selamat Ulang Tahun, Marie!";
    let index = 0;

    // Fungsi untuk mengetik teks satu per satu
    function typeWriter() {
        if (index < greeting.length) {
            mainText.textContent += greeting.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        } else {
            // Setelah teks selesai, mulai kembang api, bunga, dan hati
            setTimeout(() => {
                flowerAndHeart.classList.remove('hidden');
                setTimeout(() => flowerAndHeart.style.opacity = 1, 100);
                startFireworks();
                // Musik akan dimulai oleh event listener tombol, tidak di sini lagi
            }, 2000);
        }
    }

    // Objek Kembang Api
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.vx = Math.random() * 4 - 2;
            this.vy = Math.random() * 4 - 2;
            this.color = color;
            this.alpha = 1;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= 0.01;
        }

        draw() {
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Fungsi untuk membuat kembang api
    function createExplosion(x, y, color) {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    // Animasi kembang api
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.update();
            p.draw();
            if (p.alpha <= 0) {
                particles.splice(i, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    // Mulai kembang api
    function startFireworks() {
        const fireworkInterval = setInterval(() => {
            createExplosion(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                `${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}`
            );
        }, 800);

        setTimeout(() => {
            clearInterval(fireworkInterval);
            finalMessage.classList.remove('hidden');
            setTimeout(() => finalMessage.style.opacity = 1, 100);
            song.pause();
        }, 15000);
    }

    // --- LOGIKA BARU UNTUK MEMULAI SEMUA ANIMASI SETELAH KLIK TOMBOL ---
    startButton.addEventListener('click', () => {
        // Sembunyikan tombol
        startButton.classList.add('hidden');
        
        // Mulai memutar musik
        song.play();
        
        // Tampilkan teks utama
        setTimeout(() => {
            mainText.style.opacity = 1;
            typeWriter();
        }, 1000);
    });

    // Jalankan animasi utama canvas secara terus-menerus
    animate();

    // Atur ukuran kanvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});