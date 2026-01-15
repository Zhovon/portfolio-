# 🌐 Cloudflare DNS Quick Reference

## Your DNS Configuration for Vercel

### Main Domain Records

Add these records in your Cloudflare dashboard:

#### Record 1: Root Domain (A Record)
```
Type: A
Name: @ (or leave blank for root)
IPv4 address: 76.76.21.21
Proxy status: ✅ Proxied (orange cloud ON)
TTL: Auto
```

#### Record 2: WWW Subdomain (CNAME Record)
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: ✅ Proxied (orange cloud ON)
TTL: Auto
```

---

## ✅ What This Does

- `yourdomain.com` → Points to Vercel (your portfolio)
- `www.yourdomain.com` → Points to Vercel (your portfolio)

---

## 🛡️ Your Existing Records (DON'T TOUCH!)

These stay unchanged and keep working:

### Subdomains (Stay at Hostinger)
- `blog.yourdomain.com` → Hostinger ✅
- `shop.yourdomain.com` → Hostinger ✅
- `app.yourdomain.com` → Hostinger ✅
- Any other subdomains → Hostinger ✅

### Email Records (Stay at Hostinger)
- MX records → Hostinger mail servers ✅
- SPF, DKIM, DMARC → Unchanged ✅
- `mail.yourdomain.com` → Hostinger ✅

**Your email will continue working normally!**

---

## 📋 Step-by-Step in Cloudflare

1. **Log in to Cloudflare**
   - Go to https://dash.cloudflare.com
   - Select your domain

2. **Navigate to DNS**
   - Click "DNS" in the left sidebar
   - You'll see "DNS Management"

3. **Add A Record**
   - Click "Add record"
   - Select type: **A**
   - Name: **@**
   - IPv4 address: **76.76.21.21**
   - Proxy status: **Proxied** (orange cloud)
   - Click "Save"

4. **Add CNAME Record**
   - Click "Add record" again
   - Select type: **CNAME**
   - Name: **www**
   - Target: **cname.vercel-dns.com**
   - Proxy status: **Proxied** (orange cloud)
   - Click "Save"

5. **Done!** ✅

---

## ⚙️ Cloudflare SSL/TLS Settings

**Important:** Set SSL/TLS mode correctly

1. Go to "SSL/TLS" tab in Cloudflare
2. Select "Overview"
3. Set encryption mode to: **Full (strict)**
4. This ensures end-to-end encryption

---

## 🔍 Verify DNS Propagation

### Online Tool
1. Go to https://www.whatsmydns.net
2. Enter your domain
3. Select "A" record type
4. Check if it shows `76.76.21.21` globally

### Command Line
```bash
# Check A record
nslookup yourdomain.com

# Should show: 76.76.21.21

# Check CNAME record
nslookup www.yourdomain.com

# Should show: cname.vercel-dns.com
```

---

## ⏱️ Timeline

- **DNS Update**: Instant in Cloudflare
- **Propagation**: 5-30 minutes globally
- **SSL Certificate**: 10-15 minutes (automatic)
- **Full Activation**: Usually within 30 minutes

---

## 🚨 Troubleshooting

### Issue: Domain not loading

**Wait Time**
- Give it 10-30 minutes for DNS propagation
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private mode

**Check Records**
- Verify A record: `76.76.21.21`
- Verify CNAME: `cname.vercel-dns.com`
- Ensure proxy is ON (orange cloud)

### Issue: SSL Certificate Error

**Solution**
- Check SSL/TLS mode is "Full (strict)"
- Wait 15 minutes for certificate generation
- Clear browser cache and retry

### Issue: Email stopped working

**This shouldn't happen!**
- MX records should be unchanged
- Check MX records in Cloudflare DNS
- Contact Hostinger support if needed

---

## 📊 Recommended Cloudflare Settings

### Speed Optimization
1. **Auto Minify**
   - Go to "Speed" → "Optimization"
   - Enable HTML, CSS, JavaScript

2. **Brotli Compression**
   - Enable in "Speed" → "Optimization"

### Caching
1. **Browser Cache TTL**
   - Set to 4 hours or higher

2. **Always Online**
   - Enable for offline fallback

### Security
1. **Always Use HTTPS**
   - Enable in "SSL/TLS" → "Edge Certificates"

2. **Automatic HTTPS Rewrites**
   - Enable in "SSL/TLS" → "Edge Certificates"

---

## ✅ Final Checklist

Before leaving Cloudflare:

- [ ] A record added (@  → 76.76.21.21)
- [ ] CNAME record added (www → cname.vercel-dns.com)
- [ ] Both records have proxy ON (orange cloud)
- [ ] SSL/TLS mode set to "Full (strict)"
- [ ] Existing MX records unchanged
- [ ] Existing subdomain records unchanged

---

## 🎯 What Happens Next

1. **Cloudflare** receives requests for your domain
2. **Proxies** them through their CDN (orange cloud)
3. **Forwards** to Vercel servers
4. **Vercel** serves your Next.js portfolio
5. **SSL** encrypted end-to-end

**Result:** Fast, secure, globally distributed portfolio! 🚀

---

## 📞 Support

**Cloudflare Issues:**
- Cloudflare Community: https://community.cloudflare.com
- Cloudflare Support: https://support.cloudflare.com

**Vercel Issues:**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

**DNS Propagation:**
- Check: https://www.whatsmydns.net
- Usually resolves within 30 minutes

---

**That's it!** Your DNS is configured correctly. 🎉

**Next:** Wait for propagation, then visit your domain!
