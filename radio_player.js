// Script para el reproductor de Radio VEM

class RadioPlayer {
    constructor() {
        // Rutas de los archivos de audio
        this.musicFiles = [
            'radio/RADIO BRAZIL.mp3',
            'radio/RADIO FRANCIA.mp3',
            'radio/RADIO INGLATERRA.mp3',
            'radio/RADIO IRELAND.mp3',
            'radio/RADIO ITALIA.mp3',
            'radio/RADIO WESTERN.mp3'
        ];
        
        this.locutoraFiles = [
            'radio/Locutora 1.mp3',
            'radio/Locutora 2.mp3',
            'radio/Locutora 3.mp3',
            'radio/Locutora 4.mp3',
            'radio/Locutora 5.mp3',
            'radio/Locutora 6.mp3',
            'radio/Locutora 7.mp3',
            'radio/Locutora 8.mp3',
            'radio/Locutora 9.mp3',
            'radio/Locutora 10.mp3',
        ];
        
        // Elementos de audio
        this.audioPlayer = new Audio();
        this.isPlaying = false;
        this.isLocutora = false;
        
        // Control de tiempo para locutora
        this.locutoraInterval = null;
        this.locutoraTimeout = 30 * 60 * 1000; // 30 minutos en milisegundos
        
        // Índice de la canción actual
        this.currentIndex = 0;
        
        // Índice de la locutora actual
        this.currentLocutoraIndex = undefined; // Se inicializará en getNextLocutoraIndex()
        
        // Configurar eventos del reproductor
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Cuando termina una canción, reproducir la siguiente
        this.audioPlayer.addEventListener('ended', () => {
            if (this.isLocutora) {
                this.isLocutora = false;
                this.playRandomMusic();
            } else {
                this.playNext();
            }
        });
    }
    
    // Obtener un índice aleatorio para la música
    getRandomMusicIndex() {
        return Math.floor(Math.random() * this.musicFiles.length);
    }
    
    // Obtener el siguiente índice para la locutora en orden secuencial
    getNextLocutoraIndex() {
        // Si no hay un índice actual de locutora, comenzar desde 0
        if (this.currentLocutoraIndex === undefined) {
            this.currentLocutoraIndex = 0;
        } else {
            // Incrementar el índice y volver a 0 si llega al final
            this.currentLocutoraIndex = (this.currentLocutoraIndex + 1) % this.locutoraFiles.length;
        }
        return this.currentLocutoraIndex;
    }
    
    // Reproducir música aleatoria
    playRandomMusic() {
        const randomIndex = this.getRandomMusicIndex();
        this.currentIndex = randomIndex;
        this.audioPlayer.src = this.musicFiles[randomIndex];
        this.audioPlayer.play();
    }
    
    // Reproducir siguiente canción
    playNext() {
        // Elegir una nueva canción aleatoria diferente a la actual
        let newIndex;
        do {
            newIndex = this.getRandomMusicIndex();
        } while (newIndex === this.currentIndex && this.musicFiles.length > 1);
        
        this.currentIndex = newIndex;
        this.audioPlayer.src = this.musicFiles[newIndex];
        this.audioPlayer.play();
    }
    
    // Reproducir locutora en orden secuencial
    playNextLocutora() {
        this.isLocutora = true;
        const nextIndex = this.getNextLocutoraIndex();
        
        // Reproducir locutora
        this.audioPlayer.src = this.locutoraFiles[nextIndex];
        this.audioPlayer.play();
        
        // Cuando termine la locutora, reproducir música aleatoria
        this.audioPlayer.onended = () => {
            this.isLocutora = false;
            // Reproducir música aleatoria después de la locutora
            this.playRandomMusic();
            
            // Restaurar el manejador de eventos original
            this.setupEventListeners();
        };
    }
    
    // Iniciar reproducción
    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            
            // Reproducir la locutora solo al inicio de la transmisión
            this.playNextLocutora();
            // Ya no configuramos intervalo para reproducir locutora cada 30 minutos
        }
    }
    
    // Detener reproducción
    stop() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.audioPlayer.pause();
            
            // Limpiar intervalo de locutora
            if (this.locutoraInterval) {
                clearInterval(this.locutoraInterval);
                this.locutoraInterval = null;
            }
        }
    }
    
    // Alternar entre reproducir y detener
    toggle() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.play();
        }
        return this.isPlaying;
    }
}

// Inicializar el reproductor cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const radioPlayer = new RadioPlayer();
    
    // Buscar el elemento de Radio VEM y el indicador de reproducción
    const radioVemLink = document.getElementById('radio-vem-link');
    const radioIndicator = document.getElementById('radio-status-indicator');
    
    // Función para mostrar/ocultar el indicador de reproducción
    function updatePlayingIndicator(isPlaying) {
        if (radioIndicator) {
            radioIndicator.style.display = isPlaying ? 'block' : 'none';
        }
    }
    
    if (radioVemLink) {
        
        // Prevenir navegación al hacer clic en el enlace de radio
        radioVemLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Alternar reproducción al hacer clic en el enlace
            const isPlaying = radioPlayer.toggle();
            updatePlayingIndicator(isPlaying);
        });
    }
});