# HR Platform - Modern Jekyll Theme

A professional, custom-built Jekyll theme for HR Platform landing page and blog.

## 🚀 Quick Start

### Prerequisites
- Ruby 3.0+
- Jekyll 4.3+
- Bundler

### Installation

```bash
# Clone repository
git clone https://github.com/guerkankaraduman-prog/hrplatform.git
cd hrplatform

# Install dependencies
bundle install

# Run locally
bundle exec jekyll serve
```

Visit `http://localhost:4000` in your browser.

## 📁 Project Structure

```
hrplatform/
├── _config.yml                 # Jekyll configuration
├── _layouts/                   # Page templates
│   ├── default.html           # Base layout
│   ├── page.html              # Page layout
│   ├── home.html              # Homepage layout
│   └── post.html              # Blog post layout
├── _includes/                 # Reusable components
│   ├── header.html            # Navigation header
│   ├── footer.html            # Footer
│   ├── hero.html              # Hero section
│   ├── features.html          # Features grid
│   ├── testimonials.html      # Customer testimonials
│   ├── trust-badges.html      # Security badges
│   └── cta.html               # Call-to-action
├── _sass/                     # SCSS stylesheets
│   ├── main.scss              # Main styles
│   ├── variables.scss         # Color & typography
│   ├── responsive.scss        # Mobile responsive
│   └── dark-mode.scss         # Dark mode styles
├── assets/
│   ├── css/                   # Compiled CSS
│   ├── js/
│   │   ├── script.js          # Main JavaScript
│   │   ├── analytics.js       # Analytics tracking
│   │   └── pwa.js             # PWA service worker
│   └── images/
├── index.md                    # Homepage
├── pages/                      # Static pages
│   ├── features.md
│   ├── pricing.md
│   ├── about.md
│   ├── contact.md
│   └── privacy.md
├── _posts/                     # Blog articles
├── .github/workflows/          # CI/CD
└── Gemfile                     # Ruby dependencies
```

## 🎨 Customization

### Colors & Typography
Edit `_sass/variables.scss` to customize colors, fonts, and spacing.

### Content
- Homepage: Edit `index.md`
- Pages: Add `.md` files in `pages/` folder
- Blog: Create new `.md` files in `_posts/` folder
- Config: Update `_config.yml` with your company details

## 📱 Features

✅ Fully Responsive Design
✅ Dark Mode Support
✅ PWA Ready (Progressive Web App)
✅ SEO Optimized
✅ Analytics Integration
✅ Fast Performance
✅ Accessibility (WCAG 2.1 AA)
✅ Mobile-First Design
✅ Automated CI/CD with GitHub Actions

## 🚀 Deployment

### GitHub Pages (Recommended)

1. Push to GitHub
2. Go to Settings → Pages
3. Select `main` branch as source
4. Site will be live at: `https://guerkankaraduman-prog.github.io/hrplatform`

### Vercel or Netlify
1. Connect your GitHub repo
2. Set build command: `jekyll build`
3. Set publish directory: `_site`
4. Deploy!

## 📊 Analytics

Analytics are configured in `assets/js/analytics.js`. Update with your tracking ID:
- Google Analytics
- Hotjar
- Mixpanel

## 🔒 Security

- GDPR compliant with cookie banner
- Security headers configured
- Trust badges for certifications
- Privacy policy included

## 📝 Blog

Create new blog posts in `_posts/` with filename format: `YYYY-MM-DD-title.md`

```markdown
---
layout: post
title: "Your Blog Title"
date: 2024-04-24
category: HR Tips
author: Team
---

Your content here...
```

## 🤝 Contributing

Contributions welcome! Please follow the existing code style.

## 📄 License

MIT License - feel free to use this theme for your projects.

## 📧 Support

For questions or issues, contact: support@hrplatform.com

---

**Built with ❤️ by HR Platform Team**