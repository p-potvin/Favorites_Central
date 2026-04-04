import https from 'https';

const queries = ['lucide-react vite extension stackoverflow implement wrapper', 'lucide-react implement something over it stackoverflow react'];

queries.forEach(q => {
  https.get('https://html.duckduckgo.com/html/?q=' + encodeURIComponent(q), { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => {
          console.log('\n--- ' + q + ' ---');
          const matches = data.match(/class="result__snippet[^>]*>(.*?)<\/a>/gi);
          if (matches) console.log(matches.slice(0, 5).map(m => m.replace(/<[^>]+>/g, '').replace(/&#x27;/g, "'").replace(/&quot;/g, "\"")));
      });
  });
});

