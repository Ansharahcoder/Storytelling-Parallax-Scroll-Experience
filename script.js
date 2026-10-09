
        /* --------------------------------------------------
         * WEB AUDIO SYNTHESIZER FOR RETRO SOUND EFFECTS
         * -------------------------------------------------- */
        class ComicSoundEngine {
            constructor() {
                this.ctx = null;
                this.muted = false;
            }

            init() {
                if (!this.ctx) {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    this.ctx = new AudioContext();
                }
            }

            playZap() {
                if (this.muted) return;
                this.init();
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(800, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.25);
                
                gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start();
                osc.stop(this.ctx.currentTime + 0.25);
            }

            playWhoosh() {
                if (this.muted) return;
                this.init();
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(150, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.15);
                
                gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start();
                osc.stop(this.ctx.currentTime + 0.18);
            }

            playBoom() {
                if (this.muted) return;
                this.init();
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'square';
                osc.frequency.setValueAtTime(120, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.4);
                
                gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start();
                osc.stop(this.ctx.currentTime + 0.4);
            }

            playClick() {
                if (this.muted) return;
                this.init();
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(600, this.ctx.currentTime);
                
                gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start();
                osc.stop(this.ctx.currentTime + 0.05);
            }
        }

        const soundEngine = new ComicSoundEngine();

        function triggerSound(type) {
            if (type === 'zap') soundEngine.playZap();
            if (type === 'whoosh') soundEngine.playWhoosh();
            if (type === 'boom') soundEngine.playBoom();
            if (type === 'click') soundEngine.playClick();
        }

        /* --------------------------------------------------
         * UI CONTROLS & EVENT LISTENERS
         * -------------------------------------------------- */
        const parallaxContainer = document.getElementById('parallaxContainer');
        const progressBar = document.getElementById('scrollProgressBar');
        
        // Scroll Progress Bar Update
        parallaxContainer.addEventListener('scroll', () => {
            const scrollTop = parallaxContainer.scrollTop;
            const scrollHeight = parallaxContainer.scrollHeight - parallaxContainer.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });

        // Chapter Drawer Toggles
        const menuToggle = document.getElementById('menuToggle');
        const chapterDrawer = document.getElementById('chapterDrawer');
        const closeDrawer = document.getElementById('closeDrawer');

        menuToggle.addEventListener('click', () => {
            soundEngine.playWhoosh();
            chapterDrawer.classList.remove('opacity-0', 'pointer-events-none');
        });

        closeDrawer.addEventListener('click', () => {
            soundEngine.playClick();
            chapterDrawer.classList.add('opacity-0', 'pointer-events-none');
        });

        function scrollToSection(sectionId) {
            soundEngine.playWhoosh();
            chapterDrawer.classList.add('opacity-0', 'pointer-events-none');
            const target = document.getElementById(sectionId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // SFX Mute/Unmute Toggle
        const sfxToggle = document.getElementById('sfxToggle');
        const sfxLabel = document.getElementById('sfxLabel');

        sfxToggle.addEventListener('click', () => {
            soundEngine.muted = !soundEngine.muted;
            if (soundEngine.muted) {
                sfxLabel.textContent = 'SFX: OFF';
                sfxToggle.classList.add('opacity-50');
            } else {
                sfxLabel.textContent = 'SFX: ON';
                sfxToggle.classList.remove('opacity-50');
                soundEngine.playZap();
            }
        });

        // Reading Theme Switcher (Cyber vs Paper)
        const themeToggle = document.getElementById('themeToggle');
        let currentTheme = 'cyber';

        themeToggle.addEventListener('click', () => {
            soundEngine.playClick();
            if (currentTheme === 'cyber') {
                document.body.classList.add('theme-paper');
                themeToggle.firstElementChild.textContent = 'THEME: PAPER';
                currentTheme = 'paper';
            } else {
                document.body.classList.remove('theme-paper');
                themeToggle.firstElementChild.textContent = 'THEME: CYBER';
                currentTheme = 'cyber';
            }
        });

        /* --------------------------------------------------
         * LORE INSPECTOR MODAL SYSTEM
         * -------------------------------------------------- */
        const loreModal = document.getElementById('loreModal');
        const loreTitle = document.getElementById('loreTitle');
        const loreText = document.getElementById('loreText');
        const closeLore = document.getElementById('closeLore');

        function openLore(title, text) {
            soundEngine.playZap();
            loreTitle.textContent = title;
            loreText.textContent = text;
            loreModal.classList.remove('opacity-0', 'pointer-events-none');
            document.getElementById('loreModalContent').classList.remove('scale-90');
            document.getElementById('loreModalContent').classList.add('scale-100');
        }

        closeLore.addEventListener('click', () => {
            soundEngine.playClick();
            loreModal.classList.add('opacity-0', 'pointer-events-none');
            document.getElementById('loreModalContent').classList.add('scale-90');
        });

        /* --------------------------------------------------
         * INTERACTIVE STORY CHOICE SYSTEM
         * -------------------------------------------------- */
        function makeChoice(choice) {
            soundEngine.playBoom();
            const resultBox = document.getElementById('choiceResult');
            const choiceTitle = document.getElementById('choiceTitle');
            const choiceDesc = document.getElementById('choiceDesc');

            resultBox.classList.remove('hidden');

            if (choice === 'broadcast') {
                choiceTitle.textContent = 'SIGNAL TRANSMITTED ACROSS ALL SECTORS!';
                choiceDesc.textContent = 'Vex uploads the encrypted mainframe data. Within seconds, millions of holograms project the truth across the sky. The Syndicate collapses, but Vex is now the most wanted fugitive in the galaxy.';
            } else {
                choiceTitle.textContent = 'SYSTEM PURGED - SHADOW PROTOCOL ENGAGED!';
                choiceDesc.textContent = 'Vex wipes the server drives clean. Sector 9 returns to quiet dark streets. The Syndicate remains in power, but Vex disappears unharmed into the cyber wilderness.';
            }

            resultBox.scrollIntoView({ behavior: 'smooth' });
        }

        /* --------------------------------------------------
         * INTERSECTION OBSERVER FOR SCROLL REVEAL FALLBACK
         * -------------------------------------------------- */
        document.addEventListener('DOMContentLoaded', () => {
            const observerOptions = {
                root: parallaxContainer,
                threshold: 0.2
            };

            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        soundEngine.playWhoosh();
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.reveal-element, .comic-panel').forEach(el => {
                revealObserver.observe(el);
            });
        });

