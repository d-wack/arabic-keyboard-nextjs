# 📦 NPM Publishing Guide

## ✅ Package is Ready for Publishing!

Your Arabic keyboard package is now properly configured and ready to be published to npm. Here's what has been set up:

### Files Created:
- ✅ `src/index.ts` - Main package entry point
- ✅ `tsconfig.build.json` - TypeScript build configuration  
- ✅ `.npmignore` - Files to exclude from npm package
- ✅ `LICENSE` - MIT license
- ✅ `PACKAGE_README.md` - Comprehensive package documentation
- ✅ `package.json` - Updated with npm metadata

### Package Configuration:
- **Name**: `@d-wack/arabic-keyboard-nextjs`
- **Version**: 1.0.0
- **License**: MIT
- **Exports**: Components + TypeScript types + styles
- **Build**: TypeScript compilation to `dist/` folder

---

## 🚀 How to Publish to NPM

### Step 1: Create NPM Account (if you don't have one)
```bash
# Go to https://www.npmjs.com/signup
# Or run:
npm adduser
```

### Step 2: Login to NPM
```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- 2FA code (if enabled)

### Step 3: Test the Package Locally (Optional but Recommended)

#### Option A: Use `npm pack`
```bash
cd /home/dotwack/html/arabic-keyboard-nextjs
npm pack
```
This creates a `.tgz` file you can inspect or install locally:
```bash
cd /home/dotwack/html/arabic-keyboard-test
npm install ../arabic-keyboard-nextjs/d-wack-arabic-keyboard-nextjs-1.0.0.tgz
```

#### Option B: Use `npm link`
```bash
# In the package directory:
cd /home/dotwack/html/arabic-keyboard-nextjs
npm link

# In your test project:
cd /home/dotwack/html/arabic-keyboard-test
npm link @d-wack/arabic-keyboard-nextjs
```

### Step 4: Publish to NPM

#### Dry Run (Test without publishing)
```bash
cd /home/dotwack/html/arabic-keyboard-nextjs
npm publish --dry-run
```

This will show you:
- What files will be included
- Package size
- Any warnings or errors

#### Actually Publish
```bash
npm publish --access public
```

**Note**: The `--access public` flag is required for scoped packages (@d-wack/...)

---

## 📋 Pre-Publishing Checklist

Before running `npm publish`, verify:

- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build:package`
- [ ] Package name is unique (check https://www.npmjs.com/package/@d-wack/arabic-keyboard-nextjs)
- [ ] Version number is correct in `package.json`
- [ ] README.md has proper documentation
- [ ] LICENSE file exists
- [ ] `.npmignore` excludes unnecessary files
- [ ] You're logged in to npm: `npm whoami`
- [ ] Repository URL is correct in `package.json`

---

## 🔄 Publishing Updates

For future updates:

### 1. Update Version Number
```bash
# Patch release (1.0.0 -> 1.0.1)
npm version patch

# Minor release (1.0.0 -> 1.1.0)
npm version minor

# Major release (1.0.0 -> 2.0.0)
npm version major
```

### 2. Commit and Push
```bash
git add .
git commit -m "Release v1.0.1"
git push origin main
git push --tags
```

### 3. Publish
```bash
npm publish
```

---

## 📦 What Gets Published

When you run `npm publish`, these files will be included:
```
@d-wack/arabic-keyboard-nextjs/
├── dist/
│   ├── index.js
│   ├── index.d.ts
│   ├── styles.css
│   └── components/
│       ├── ArabicKeyboard.js
│       ├── ArabicKeyboard.d.ts
│       ├── WordDisplay.js
│       └── WordDisplay.d.ts
├── README.md
└── LICENSE
```

**Size**: ~50KB (estimated)

---

## 🎯 Using Your Published Package

After publishing, users can install it with:

```bash
npm install @d-wack/arabic-keyboard-nextjs
```

And use it like this:

```tsx
import { ArabicKeyboard, WordDisplay } from '@d-wack/arabic-keyboard-nextjs';
import '@d-wack/arabic-keyboard-nextjs/styles';
```

---

## 🔧 Troubleshooting

### "Package name already exists"
- Change the package name in `package.json`
- Or use a different scope: `@your-username/arabic-keyboard-nextjs`

### "You must be logged in to publish"
```bash
npm login
```

### "402 Payment Required"
- Scoped packages (@d-wack/...) are private by default
- Add `--access public` flag: `npm publish --access public`

### "Version already published"
- Update version: `npm version patch`
- Then publish again

### Build Errors
```bash
# Clean and rebuild
rm -rf dist
npm run build:package
```

---

## 📊 Package Stats

After publishing, your package will be available at:
- **NPM**: https://www.npmjs.com/package/@d-wack/arabic-keyboard-nextjs
- **unpkg CDN**: https://unpkg.com/@d-wack/arabic-keyboard-nextjs@latest/
- **GitHub**: https://github.com/d-wack/arabic-keyboard-nextjs

You can track:
- Weekly downloads
- GitHub stars
- Issues and pull requests

---

## 🎉 Next Steps After Publishing

1. **Update Main README**: Copy `PACKAGE_README.md` to `README.md` for GitHub
2. **Create GitHub Release**: Tag the version and create release notes
3. **Share**: Tweet about it, post on Reddit, etc.
4. **Add Badge**: Add npm version badge to README
5. **Documentation Site**: Consider creating a dedicated docs site
6. **Examples**: Create example projects using your package

---

## 🔐 Security Best Practices

1. **Enable 2FA** on your npm account
2. **Don't commit** `.npmrc` with auth tokens
3. **Review** what gets published with `npm pack`
4. **Use** `prepublishOnly` script to run tests
5. **Sign** your packages with `npm publish --otp=123456`

---

## 📝 Quick Command Reference

```bash
# Build package
npm run build:package

# Test everything
npm test

# Check what will be published
npm publish --dry-run

# Publish (scoped package)
npm publish --access public

# Update version
npm version patch/minor/major

# Check if logged in
npm whoami

# View package info
npm info @d-wack/arabic-keyboard-nextjs
```

---

**Ready to publish?** Run these commands:

```bash
cd /home/dotwack/html/arabic-keyboard-nextjs
npm test                     # Make sure tests pass
npm run build:package        # Build the package
npm publish --access public  # Publish to npm!
```

Good luck! 🚀
