import urllib.request, urllib.parse, re, html

def search_ddg(query):
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(query)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    res = urllib.request.urlopen(req).read().decode('utf-8')
    snippets = re.findall(r'<a class=\"result__snippet [^>]*>(.*?)</a>', res, re.IGNORECASE)
    for s in snippets[:3]:
        print(html.unescape(re.sub(r'<[^>]+>', '', s)))

search_ddg('\"lucide-react\" \"implement\" \"stackoverflow\"')
search_ddg('lucide-react extension fix wrapper')
