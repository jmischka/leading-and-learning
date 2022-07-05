// A simple example for testing it manually from your browser.
// If this is located at pages/api/preview.js, then
// open /api/preview from your browser.

// https://curious-lily-9b92dc.netlify.app/api/preview?secret=skojp3Mb458BkuylG4jmOWNKgXia3lI14oE88o32yCExgnCe3hkc8Y4kgyiCCQtpbIgLRT1MESJM4tkB7l5bBAXfSrBZWUJJViyRMLakuuzy8oqKkmkZd4tE6IeyRzJgMimjWd5xAiZxQrsLdpzz1p8rLtqmHJWHdFn9nfbOKfoOmHqixCVM&slug=/about

export default function handler(req, res) {
    res.setPreviewData({})
    res.end('Preview mode enabled')
}