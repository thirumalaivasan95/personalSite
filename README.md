# Thirumalai Vasan — Portfolio

A modern, interactive developer portfolio with particle animations, smooth scroll effects, dark/light theming, and a working contact form.

## Live Preview

**[Site Link](https://thirumalaivasan95.github.io/personalSite/)**

## Features

- **Particle Background** — Interactive particles that react to cursor movement
- **Custom Cursor** — Context-aware cursor with hover text hints
- **GSAP Animations** — Scroll-triggered timelines and entrance effects
- **Locomotive Scroll** — Smooth parallax scrolling throughout
- **Typing Effect** — Animated role display via Typed.js
- **Dark / Light Theme** — Toggle with preference saved to localStorage
- **Project Filtering** — Live filter with smooth Isotope-style transitions
- **Project Modals** — Detailed project overlays without page navigation
- **Interactive Timeline** — Expandable work and education history
- **Contact Form** — Floating-label form delivered to Gmail via Web3Forms
- **Responsive** — Fully adaptive across mobile, tablet and desktop

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Animations | [GSAP](https://greensock.com/gsap/) + ScrollTrigger |
| Smooth scroll | [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/) |
| Typing effect | [Typed.js](https://github.com/mattboldt/typed.js/) |
| Particles | [Particles.js](https://github.com/VincentGarreau/particles.js/) |
| Text split | [Splitting.js](https://splitting.js.org/) |
| Layout | [Bootstrap 5](https://getbootstrap.com/) |
| Icons | [Font Awesome 5](https://fontawesome.com/) |
| Contact | [Web3Forms](https://web3forms.com/) |

## File Structure

```
personalSite/
├── index.html                    # Single-page application entry point
├── assets/
│   ├── css/
│   │   └── style.css             # All styles and theme variables
│   ├── js/
│   │   ├── main.js               # Core animations, navigation, UI
│   │   ├── contact.js            # Contact form module (Web3Forms)
│   │   ├── config.js             # API keys — gitignored, never committed
│   │   ├── config.example.js     # Config template — safe to commit
│   │   └── particles.json        # Particle system configuration
│   ├── img/                      # Images (profile, background, projects)
│   └── pdf/
│       └── Resume.pdf            # Downloadable resume
├── forms/
│   └── contact.php               # PHP fallback (if server supports it)
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions — builds & deploys to Pages
├── .gitignore
└── DEPLOYMENT.md
```

## Local Setup

```bash
# Clone the repo
git clone https://github.com/thirumalaivasan95/personalSite.git
cd personalSite

# Set up your API key config
cp assets/js/config.example.js assets/js/config.js
# Edit config.js and paste your Web3Forms key
```

Then open `index.html` in a browser — no build step needed.

## Contact Form Setup

The form delivers messages straight to Gmail via [Web3Forms](https://web3forms.com/) (free, 250 submissions/month).

1. Go to [web3forms.com](https://web3forms.com) and enter your Gmail address
2. Copy the access key from the email you receive
3. Paste it into `assets/js/config.js`:
   ```js
   window.SITE_CONFIG = {
     web3formsKey: 'your-actual-key-here'
   };
   ```

`config.js` is listed in `.gitignore` — your key is never committed to the repo.

## Deployment (GitHub Pages)

The included GitHub Actions workflow builds and deploys automatically on every push to `master`.

**One-time setup:**

1. Add your key as a GitHub Secret:
   - Repo → **Settings** → **Secrets and variables** → **Actions**
   - New secret: `WEB3FORMS_KEY` = your key

2. Enable Pages via Actions:
   - Repo → **Settings** → **Pages** → Source: **GitHub Actions**

3. Push to `master` — the workflow handles the rest.

See [DEPLOYMENT.md](DEPLOYMENT.md) for full details.

## Customization

| What | Where |
|---|---|
| Color scheme | CSS variables at the top of `assets/css/style.css` |
| Content & sections | `index.html` |
| Animation timing | `assets/js/main.js` |
| Particle behaviour | `assets/js/particles.json` |

## Browser Support

Chrome · Firefox · Safari · Edge · Opera (latest versions)

## Author

<<<<<<< HEAD
**Thirumalai Vasan**
[GitHub](https://github.com/thirumalaivasan95) · [LinkedIn](https://www.linkedin.com/in/thirumalaivasan95/) · [thirumalaithiruvasan@gmail.com](mailto:thirumalaithiruvasan@gmail.com)
=======
- **Design & Development**: [Thirumalai Vasan](https://github.com/thirumalaivasan95)
- **Libraries**:
  - [GSAP](https://greensock.com/gsap/)
  - [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/)
  - [Typed.js](https://github.com/mattboldt/typed.js/)
  - [Particles.js](https://github.com/VincentGarreau/particles.js/)
  - [Bootstrap](https://getbootstrap.com/)
  - [Font Awesome](https://fontawesome.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Thirumalai Vasan - [thirumalaithiruvasan@gmail.com](mailto:thirumalaithiruvasan@gmail.com)

Project Link: [https://github.com/thirumalaivasan95/personalSite](https://github.com/thirumalaivasan95/personalSite)
>>>>>>> b42ce35533827d569739109b3b71817072e3487f
