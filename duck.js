const https = require('https');
https.get('https://html.duckduckgo.com/html/?q=lucide-react+implement+wrapper+stackoverflow', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const m = d.match(/class=\"result__snippet[^>]*\">(.*?)<\/a>/gi);
    if (m) console.log(m.slice(0,5).map(x => x.replace(/<[^>]+>/g, '')));
  });
});
