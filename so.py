import urllib.request, json
url = 'https://api.stackexchange.com/2.3/search?order=desc&sort=relevance&intitle=lucide&site=stackoverflow'
ans_url = 'https://api.stackexchange.com/2.3/questions/{}/answers?order=desc&sort=votes&site=stackoverflow&filter=withbody'
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    res = urllib.request.urlopen(req).read().decode('utf-8')
    data = json.loads(res)['items']
    for q in data[:20]:
        title = q['title']
        if 'react' in title.lower() or 'vite' in title.lower():
            print('Q:', title)
except Exception as e: print(e)
