# Portfolio Website Deployment Guide

## File Structure

Ensure your project follows this file structure:

```
portfolio-website/
├── index.html              # Main HTML file
├── .htaccess               # Server configuration file
├── README.md               # Project readme
├── DEPLOYMENT.md           # This deployment guide
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   ├── main.js         # Main JavaScript file
│   │   └── particles.json  # Particles configuration
│   ├── img/
│   │   ├── me.jpg          # Your profile image
│   │   ├── bg.jpg          # Background image
│   │   ├── projects/       # Project images folder
│   │   │   ├── project-1.jpg
│   │   │   ├── project-2.jpg
│   │   │   ├── project-3.jpg
│   │   │   ├── project-4.jpg
│   │   │   ├── project-5.jpg
│   │   │   └── project-6.jpg
│   │   └── favicon.ico     # Website favicon
│   └── pdf/
│       └── resume.pdf      # Your downloadable resume
└── forms/
    └── contact.php         # PHP contact form handler
```

## Image Requirements

1. **Profile Image (me.jpg)**:
   - Dimensions: 400px × 400px
   - Format: JPEG or PNG
   - Location: assets/img/me.jpg

2. **Background Image (bg.jpg)**:
   - Dimensions: 1920px × 1080px
   - Dark, subtle image that works with a dark overlay
   - Format: JPEG
   - Location: assets/img/bg.jpg

3. **Project Images**:
   - Dimensions: 800px × 600px
   - Format: JPEG or PNG
   - Location: assets/img/projects/project-[number].jpg

4. **Favicon**:
   - Dimensions: 32px × 32px
   - Format: ICO, PNG, or SVG
   - Location: assets/img/favicon.ico

## Required Libraries & CDN Links

All required libraries are already included in the `index.html` file via CDN links:

- Bootstrap 5
- GSAP (Animation)
- Locomotive Scroll (Smooth scrolling)
- Typed.js (Typing effect)
- Particles.js (Background particles)
- Font Awesome (Icons)
- Google Fonts (Typography)

## Local Development

1. To run the site locally, you'll need a local development server that supports PHP.
2. Options include:
   - [XAMPP](https://www.apachefriends.org/)
   - [MAMP](https://www.mamp.info/)
   - [Local by Flywheel](https://localwp.com/)
   - PHP's built-in server: `php -S localhost:8000`

## Deployment Steps

### Shared Hosting (cPanel, Plesk, etc.)

1. **Prepare your files**:
   - Make sure all files are in the correct structure
   - Replace placeholder images with your own
   - Update personal information in the HTML
   - Update the email address in forms/contact.php

2. **Upload to server**:
   - Connect to your hosting via FTP (using FileZilla, Cyberduck, etc.)
   - Upload all files to the public_html or www directory
   - Ensure file permissions are set correctly:
     - HTML/CSS/JS/Image files: 644
     - Directories: 755
     - PHP files: 644

3. **Test the website**:
   - Visit your domain to ensure everything loads correctly
   - Test the contact form
   - Check mobile responsiveness

### GitHub Pages Deployment

For GitHub Pages, you'll need to modify the contact form since PHP isn't supported:

1. **Create a GitHub repository** for your portfolio

2. **Modify the contact form** to use a service like Formspree or Netlify Forms:
   ```html
   <!-- Example using Formspree -->
   <form action="https://formspree.io/f/yourformid" method="POST" class="contact-form">
     <!-- Form fields remain the same -->
   </form>
   ```

3. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to GitHub Pages section
   - Select the branch to deploy (main)
   - Save the settings

## Post-Deployment Checklist

- [ ] Test website on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Ensure all links work correctly
- [ ] Test contact form submission
- [ ] Verify smooth animations and transitions
- [ ] Check for console errors
- [ ] Validate HTML and CSS
- [ ] Test website loading speed (use Google PageSpeed Insights)
- [ ] Set up Google Analytics (optional)

## Performance Optimization Tips

1. **Optimize images** using tools like [TinyPNG](https://tinypng.com/)
2. **Minify CSS and JavaScript** files for production
3. **Enable GZIP compression** on your server
4. **Implement lazy loading** for images
5. **Use browser caching** (already set up in the .htaccess file)
6. **Consider disabling particle effects** on mobile devices for better performance

## Troubleshooting Common Issues

### Contact Form Not Working
- Ensure your server supports PHP
- Check the email address in contact.php
- Verify PHP mail() function is enabled on your server
- Check server logs for mail function errors

### Animation Issues
- Make sure all required JavaScript libraries are loaded
- Check the browser console for any errors
- Ensure GSAP and Locomotive Scroll are compatible with your browser

### Mobile Responsiveness Problems
- Test using Chrome DevTools device emulation
- Adjust CSS media queries as needed
- Ensure viewport meta tag is properly set

### Slow Loading Times
- Reduce image sizes
- Minimize HTTP requests
- Consider using a CDN for static assets
- Enable caching

## Updating the Website

To update your website after deployment:

1. Make changes to your local files
2. Test locally to ensure everything works
3. Upload only the changed files to your server via FTP
4. Clear your browser cache to see the changes

For GitHub Pages, push the changes to your repository, and GitHub will automatically update the site.